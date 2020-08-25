//@Author ismael alves
import env from './config/environments'
import { createConnection } from 'typeorm'

beforeAll( async()=>{
    // Hooks Globais
    await createConnection({
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
    })
})

afterAll( async()=>{
    // Hooks Globais
})

