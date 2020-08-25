//@Author ismael alves
import fs from 'fs'
import env from '../../config/environments'
import shell from 'shelljs'

class Utils{

    // metodo que via pergar os dados
    getData(){
        return new Promise((reject, resolve)=>{
            fs.readFile(env.system.file, 'utf8', function readFileCallback(err, file){
                if(err){
                    reject(err)
                }
                resolve(JSON.parse(file))
            })    
        })
    }
    
    //metodo que criar folders
    defaultFolder(folder){
        if (!fs.existsSync(folder)){
            // fs.mkdirSync(folder, {recursive: true});
            shell.mkdir('-p', folder)
        }
    }
}

export default new Utils()