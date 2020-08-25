//@Author ismael alves
import env from '../../config/environments'

export default function authorize(){
    return (req, resp, next)=>{  
        if(req.headers.authorization !== undefined){
                const token = req.headers.authorization
                if(env.security.secret === token){
                    next()
                }else{
                    next({name:'Forbidden', mensagem: 'Secret inválido ou incorreto'})
                } 
        }else{
            next({name:'Forbidden', mensagem: 'Secret não encontrado'})
        }
    }
}