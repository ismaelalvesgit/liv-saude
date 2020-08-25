//@Author ismael alves
export default function handlerErroMiddleware(e, req, resp, next){
    // console.log(e)
    let messages = []
    switch (e.name) {
        case 'NotFound':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Documento não encontrado'})
            resp.status(404).json(messages);
            break;
        case 'Throttling':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Limite de requisição por minuto atingido'})
            resp.status(429).json(messages)
            break;
        case 'Forbidden':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Secret inválido ou incorreto'})
            resp.status(403).json(messages)
            break;
        case 'Unauthorized':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Seu perfil não tem acesso a isso'})
            resp.status(401).json(messages);
            break;
        case 'backup':
            messages.push({nome: e.name, mensagem: e.message})
            resp.status(400).json(messages)
            break;
        case 'validate':
            messages.push({nome: e.name, mensagem: e.message})
            resp.status(400).json(messages)
            break;
        case 'contains':
            messages.push({nome: e.name, mensagem: e.message})
            resp.status(400).json(messages)
            break;
        case 'email':
            messages.push({nome:'email', mensagem:'configurações das credenciais de email estão incorretas'})
            resp.status(403).json(messages)
            break;
        case 'express-validator':
            for (let erro in e.errors){
                let name = e.errors[erro].param
                let message = e.errors[erro].msg
                if(!messages.some(msg => name.indexOf(msg.nome) != -1)){
                    messages.push({nome:name, mensagem:message})
                }
            }
            resp.status(400).json(messages)
            break;
        case 'BadRequestError':
            messages.push({nome:'body', mensagem:'corpo da requisição não pode ser vazio'})
            resp.status(400).json(messages)
            break;
        case 'QueryFailedError':
            switch (e.code) {
                case '23503':
                    messages.push({nome:'contains', mensagem:'Possui dados atrelado'})
                    break;
                case '42P01':
                default:
                    messages.push({nome:'contains', mensagem:'Codigo não mapeado'})
                    break;

            }
            resp.status(400).json(messages)
            break;
        case 'ValidationError':
            for (let field in e.errors) {      
                let name = e.errors[field].properties.path
                let message = e.errors[field].reason != null ? e.errors[field].reason : e.errors[field].properties.message
                messages.push({nome:name, mensagem:message})  
            }
            resp.status(400).json(messages)
            break;
        default:
            //aqui seria possivel enviar um email para coleta da pilha de erro
            // console.log(e)
            resp.status(500).json([
                {
                    nome: 'Erro Interno', 
                    message:`lamentamos por isso ter acontecido :( \n Seu id do erro é ${req.id}`
                }
            ])
    }
}
