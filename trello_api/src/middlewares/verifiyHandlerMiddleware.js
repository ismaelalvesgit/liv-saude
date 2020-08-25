//@Author ismael alves
import { validationResult } from 'express-validator'

export default function verifyHandlerMiddleware(req, resp, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next({name:'express-validator', errors: errors.errors})
    }else{
        req.body = Object.assign(req.body)
        next()
    }
}