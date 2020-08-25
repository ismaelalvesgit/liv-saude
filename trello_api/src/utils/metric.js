//@Author ismael alves
import { register, Counter, Summary, collectDefaultMetrics} from 'prom-client'
import ResponseTime from 'response-time'

const excludeUrl = [
    '/',
    '/favicon.ico',
    '/metrics',
    '/system/healthcheck'
]

const numOfRequests = new Counter({
    name: "numOfRequests",
    help: "Numero de requesições",
    labelNames: ['method']
})

const pathsTaken = new Counter({  
    name: 'pathsTaken',
    help: 'Caminhos percorridos na aplicação',
    labelNames: ['path']
})

const numOfUsersOn = new Summary({
    name: "numOfUsersOn",
    help: "Numero de usuários online",
    labelNames: ['num']
})

const responses = new Summary({  
    name: 'responses',
    help: 'Tempo de resposta em milis',
    labelNames: ['method', 'path', 'statusCode']
})

const responseCounters = ResponseTime((req, res, time) =>{  
    if(!excludeUrl.includes(req.path)) {
        responses.labels(req.method, req.url, res.statusCode).observe(time);
    }
})

function requestCounters (req, res, next){
    if(!excludeUrl.includes(req.path)) {
        numOfRequests.inc({ method: req.method });
        pathsTaken.inc({ path: req.path });
    }
    next();
}

function startCollection(){
    collectDefaultMetrics()
}

function injectMetricsRoute (App){
    App.get('/metrics', (req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(register.metrics());
    });
}

export { 
    numOfRequests, 
    pathsTaken, 
    responses, 
    responseCounters,
    requestCounters,
    startCollection,
    injectMetricsRoute 
} // exporta somente o necessário