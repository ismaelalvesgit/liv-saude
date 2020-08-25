//@Author ismael alves

export default function multipleValidateId(querys = []){
  return (req, resp, next)=>{
    querys.forEach((item, index)=>{
      const instance = new item.model()
      instance.getRepository().findOne({id: req.params[item.params]}).then((rs)=>{
        if(!rs){
          next({name:"NotFound"})
          return false
        }
        if(index+1 === querys.length){
          next()
          return true
        }
      }).catch((e)=>{
        next(e)
        return false
      })
    })
  }
}