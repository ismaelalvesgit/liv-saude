//@Author ismael alves
import { checkSchema } from 'express-validator'

class ListaValidator{

    cardCadastro(){
        return checkSchema({
            nome:{
                in: 'body',
                notEmpty: {
                    errorMessage: "nome e requirido"
                }
            }
        })
    }

}

export default new ListaValidator()