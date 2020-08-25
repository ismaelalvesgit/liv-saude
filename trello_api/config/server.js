//@Author ismael alves
import express from 'express'
import bodyParser from 'body-parser'
import multiparty from 'connect-multiparty'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import csp from 'helmet-csp'
import hidePoweredBy from 'hide-powered-by'
import hsts from 'hsts'
import ienoopen from 'ienoopen'
import frameguard from 'frameguard'
import xssFilter from 'x-xss-protection'
import fs from 'fs'
import cors from 'cors'
import throttlingResquestMiddleware from '../src/middlewares/throttlingResquestMiddleware'
import assignResquestMiddleware from '../src/middlewares/assignResquestMiddleware'
import handlerErroMiddleware from '../src/middlewares/handlerErroMiddleware'
import utils from '../src/utils/utils'
import locale from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'
import env from './environments'
import https from 'https'
import http from 'http'
import { requestCounters, responseCounters, injectMetricsRoute, startCollection } from '../src/utils/metric'
import storage from 'node-persist'
import path from 'path'
import { createConnection } from 'typeorm'
import card from '../src/entity/card'

//instancia
const app = express()
const server = env.server.ssl != null ? https.createServer({ 
    cert: fs.readFileSync(env.security.cert),
    key: fs.readFileSync(env.security.key)
}, app) : http.createServer(app)

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(multiparty())
app.use(compression())
app.use(cors())
app.use(helmet())
app.use(csp({
    directives: {
        fontSrc: ["'self'", 'fonts.com'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true,
        workerSrc: false 
    },
    loose: false,
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: false,
    browserSniff: true
}))
app.use(hidePoweredBy())
app.use(hsts({
    maxAge: 31536000,
    includeSubDomains: true, 
    preload: true
}))
app.use(ienoopen())
app.use(frameguard())
app.use(xssFilter())
app.use(assignResquestMiddleware)
app.use(responseCounters)
app.use(requestCounters)
if(env.server.throttling){
    app.use(throttlingResquestMiddleware)
}

//create folders default
utils.defaultFolder('./logs')

// metrics endpoint
injectMetricsRoute(app)

//loggers
morgan.token('id', function getId (req) {
    return req.id
})
app.use(morgan(':id :remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
    skip: function (req, res) { return res.statusCode < 404 },
    stream: fs.createWriteStream(`./logs/erros-${format(new Date(), 'dd-MM-yyyy', locale)}.log`, {flags: 'a'})
}))
app.use(morgan(':id :remote-addr ":method :url HTTP/:http-version" :response-time', {
    skip: function (req, res) { return res.statusCode > 400 },
    stream: fs.createWriteStream(`./logs/access-${format(new Date(), 'dd-MM-yyyy', locale)}.log`, {flags: 'a'})
}))

//assets
app.use(express.static('./src/public'))

//auto import
fs.readdirSync('./src/controllers/').forEach((file)=>{
    require(path.join(__dirname, '..', 'src/controllers', file ))(app)
})

// NotFound router
app.get('*', (req, resp)=>{
    resp.status(404).json([{nome:"NotFound", mensagem:"rota não foi encontrada :("}])
})    

// start application
function startup(port){
    return new Promise(async (resolve, reject)=>{
        env.server.port = port != null ? port : env.server.port
        createConnection({
            type: 'postgres',
            username: env.db.user,
            password: env.db.pass,
            database: env.db.database,
            port: env.db.port,
            host: env.db.host,
            entities: [
                './src/entity/*.js'
            ],
            // logging: true,
            synchronize: true
        }).then((database)=>{
            server.listen(env.server.port, ()=>{
                storage.init({
                    encoding: 'utf-8',
                    parse: JSON.parse,
                    stringify: JSON.stringify,
                    dir: './localStorage'
                })
                startCollection()
                app.use(handlerErroMiddleware)
                resolve({url:env.server.url, server:server})
                console.log('servidor online', env.server.port)
            })
        }).catch((e)=>{
            reject({
                error:{
                    mensagem: 'Não foi possível conectar à base de dados',
                    pilha: e 
                }
            })
        })
    })
}

// stop application
async function shutdown(){
    return server.close()
}

export { startup, shutdown, app, } // exporta somente o necessário