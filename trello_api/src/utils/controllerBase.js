//@Author ismael alves
import { subDays } from 'date-fns'
import { memCachedMiddleware, deleteCache } from '../middlewares/memCachedMiddleware'
import utils from './utils'

class ControllerBase{

    pageSize
    basePath

    render(resp, next){
        return (document)=>{
            if(document){
                resp.json(this.envelope(document))
            }else{
                next({name:"NotFound"})
            }
        }
    }

    renderAll(resp, next, options = {}){
        return (documents)=>{
            if(documents){
                documents.forEach(async(document, index, array)=>{
                    array[index] = this.envelope(document, null, options)
                })
                resp.json(this.envelopeAll(documents, options))
            }else{
                resp.json(this.envelopeAll([]))
            }
        }
    }

    envelope(document, basePath, options = { skipLinks : false}){
        this.basePath = basePath != null ? basePath : this.basePath
        if(!options.skipLinks){
            document =  Object.assign({_links:{}}, document)
            document._links.self = `${this.basePath}/${document.id}`
            document._links.all = `${this.basePath}`
        }
        return document
    }

    envelopeAll(documents = [], options= {}, basePath) {
        this.basePath = basePath != null ? basePath : this.basePath
        let query = ''
        if(options.query){
            Object.keys(options.query).forEach((key, i)=>{
                query += `${i == 0 ? '?':'&'}${key}=${options.query[key]}`
            })
        }
        const resource = {
            _links:{
                self: `${options.url}${query}`
            },
            items: documents
        }
        if(options.page && options.count && options.pageSize){
            let query = ''
            if(options.query){
                Object.keys(options.query).forEach((key)=>{
                    if(key != "_page") query += `&${key}=${options.query[key]}`
                })
            }
            if(options.page > 1){
                resource._links.previous = `${this.basePath}?_page=${options.page-1}${query}`
            }
            const remaining = options.count - (options.page * options.pageSize)
            if(remaining > 0){
                resource._links.remaining = remaining
                resource._links.total = options.count
                resource._links.next = `${this.basePath}?_page=${options.page+1}${query}`
            }
        }
        return options.skipLinks ? {items: documents} : resource
    }

    findById(query = {
        model, 
        populate, 
        sort, 
        basePath, 
        disableCache:false
    }){
        return [
            // !query.disableCache ? memCachedMiddleware(20) : (req, resp, next)=>{next()},
            (req, resp, next)=>{
                const model = new query.model()
                this.basePath = query.basePath != null ? query.basePath : `/${model.collection()}` 
                model.getRepository().findOne({id: req.params.id}).then(this.render(resp, next))
            }
        ]
    }

    findOne(query = {
        model, 
        condition: {}, 
        populate, 
        sort, 
        params, 
        basePath, 
        disableCache: false
    }){
        return [
            // !query.disableCache ? memCachedMiddleware(20) : (req, resp, next)=>{next()},
            (req, resp, next)=>{
                const model = new query.model()
                this.basePath = query.basePath != null ? query.basePath : `/${model.collection()}` 
                if(query.params){
                    query.params.forEach(element => {
                        query.condition[element.path] = req.params[element.params]
                    })
                }
                model.getRepository().findOne(query.condition).then(this.render(resp, next))
            }
        ]
    }

    findAll(query = {
        model, 
        condition:{}, 
        populate, 
        sort, 
        params, 
        basePath, 
        skipLinks:false,  
        disableCache:false,
        pageSize
    }){
        return [
            // !disableCache ? memCachedMiddleware(20) : (req, resp, next)=>{next()},
            (req, resp, next)=>{
                const model = new query.model()
                let countQuery = {}
                this.basePath = req._parsedUrl.pathname 
                this.pageSize = req.query._pageSize != null ? parseInt(req.query._pageSize || 1) : query.pageSize != null ? query.pageSize : 10 // itens por página
                let page = parseInt(req.query._page || 1)
                page = page > 0 ? page : 1
                const skip = (page - 1) * this.pageSize
                if(query.params){
                    query.params.forEach(element => {
                        if(element.user){
                            query.condition[element.path] = req.user.id
                            countQuery[element.path] = req.user.id
                        }else{
                            query.condition[element.path] = req.params[element.params]
                            countQuery[element.path] = req.params[element.params]
                        }
                    })
                }
                // query da requisição
                let search = {}
                try {
                    Object.keys(req.query).forEach(element => {
                        if(element == '_query') query = JSON.parse(String(req.query[element]).replace("#", "$"))
                    })
                    if(query.condition){
                        Object.keys(query.condition).forEach(element =>{
                            if(!search[element]){
                                search[element] = condition[element]
                            }         
                        })
                    }
                } catch (error) {
                    search = query.condition
                }

                //sort da requisição
                try {
                    if(req.query._sort){
                        let search = JSON.parse(String(req.query._sort))
                        Object.keys(search).forEach((element)=>{
                            if(search[element] == "asc"){
                                search[element] = 1
                            }
                            if(search[element] == "desc"){
                                search[element] = -1
                            }
                        })
                        query.sort = search
                    }else{
                        query.sort = sort
                    }
                } catch (error) {}
                // console.log(sort)
                // console.log(search)
                // console.log(this.pageSize)
                // console.log(query.sort, query.condition)
                countQuery = Object.assign(search, countQuery)
                model.getRepository().count(countQuery).then((count)=>{
                    model.getRepository().find({
                        where: query.condition,
                        skip: skip,
                        take: this.pageSize,
                        order: query.sort
                    }).then(this.renderAll(resp , next, {page, count, pageSize: this.pageSize, url: req._parsedUrl.pathname, skipLinks:query.skipLinks, query: req.query}))
                }).catch(next)
            }
        ]
    }

    delete(query = {
        model, 
        params
    }){
        return (req, resp, next) => {
            const model = new query.model()
            const id = req.params.id
            let condition = {}
            if(query.params){
                query.params.forEach(element => {
                    if(element.user){
                        condition[element.path] = req.user._id
                    }else{
                        condition[element.path] = req.params[element.params]
                    }
                })
            }else{
                condition.id = id
            }
            model.getRepository().delete(id).then((doc)=>{
                if(doc.affected > 0){
					resp.sendStatus(204)
				}else{
					next({name: "NotFound"})
				}
            }).catch(next)
        }
    }

    update(query = {
        model, 
        params
    }){
        return (req, resp, next) => {
            const model = new query.model()
            const id = query.params != null ? req.params[query.params] : req.params.id
            model.getRepository().update(id, req.body).then((rs)=>{
                if(rs.affected > 0){
					model.getRepository().findOne({id: id}).then((doc) => resp.json(doc))
				}else{
					next({name: "NotFound"})
				}
            }).catch(next)
        }
    }

    save(query = {
        model, 
        addFields
    }){
        return (req, resp, next)=>{
            const model = new query.model()
            let body = req.body
            if(query.addFields){
                query.addFields.forEach(element => {
                    if(element.user){
                        body[element.path] = req.user.id
                    }else if(element.ip){
                        body[element.path] = req.headers['x-real-ip'] || req.connection.remoteAddress;
                    }else{
                        body[element.path] = req.params[element.params]
                    }
                })
            }
            model.getRepository().save(body).then((doc)=>{
                resp.status(201).json(doc)
            }).catch(next)
        }
    }
}

export default new ControllerBase()