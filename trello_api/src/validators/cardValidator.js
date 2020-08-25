//@Author ismael alves
import { checkSchema } from 'express-validator'

class CardValidator{

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

export default new CardValidator()