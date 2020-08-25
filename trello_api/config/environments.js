//@Author ismael alves

const url = process.env.SERVER_URL  || 'http://localhost:3000'
const userDB = process.env.DB_USER || 'postgres'
const passDB = process.env.DB_PASS || '123456'
const hostDB = process.env.DB_HOST || '127.0.0.1'
const portDB = process.env.DB_PORT || 5432
const databaseDB = process.env.DB_DATABASE|| 'trello'

export default {
  server: { 
    port: process.env.SERVER_PORT || 3000,
    url: url,
    ssl: process.env.SERVER_SSL,
    throttling: process.env.SERVER_THROTTLING || true
  },
  db: {
    url: `postgres://${userDB}:${passDB}@${hostDB}:${portDB}/${databaseDB}`,
    user: userDB,
    pass: passDB,
    host: hostDB,
    port: portDB,
    database: databaseDB,
  },
  files:{
    default: url+'/uploads/system/default.png',
    uploadsPath: './src/public/uploads/',
    uploadsUrl: url+'/uploads/'
  },
  security: {
    secret: process.env.API_SECRET || `teste`,
    cert : process.env.CERT || './ssl/cert.pem',
    key : process.env.PRIVKEY || './ssl/privkey.pem',
  },
  system:{
    file: './DATA_PLANOS.json',
    file2: './DATA_TARIFA.json'
  }
}
