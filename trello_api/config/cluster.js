//@Author ismael alves
import { startup } from './server'
import cluster from 'cluster'
import { cpus } from 'os'

class Clusters{

    cpus
    
    constructor(){
        this.cpus = cpus();
        this.init()
    }

    init(){
        if(cluster.isMaster){
            this.cpus.forEach(() => cluster.fork())
            cluster.on('exit', ()=>{
                cluster.fork()
            })
        }else{
            startup()
        }
    }
}

export default new Clusters()