//@Author ismael alves
import { run } from 'jest'
import { startup, shutdown } from './config/server'

startup(3001)
.then(()=>run())
.then(()=>shutdown())
.catch(console.error)