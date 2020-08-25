//@Author ismael alves
import memcached from 'memory-cache'

//duration = segundos
function memCachedMiddleware(duration = 20){
    return (req, resp, next)=>{
        const key = "__express__" + req.originalUrl || req.url 
        const data = memcached.get(key)
        if(data){
            resp.json(JSON.parse(data))
            return;
        }else{
            resp.sendResponse = resp.send
            resp.send = (body) => {
                memcached.put(key, body, duration*1000)
                resp.sendResponse(body)
            }
            next()
        }
    }
}

function deleteCache(req){
    const key = "__express__" + req.originalUrl || req.url     
    memcached.del(key)
}

export { deleteCache, memCachedMiddleware }