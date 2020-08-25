//@Author ismael alves
import uuid from 'uuid'

export default function assignResquestMiddleware (req, res, next) {
    req.id = uuid.v4()
    next()
}