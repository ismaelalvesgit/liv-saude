//@Author ismael alves

export default function validateId(model) {
  return (req, resp, next) => {
    const instance = new model()
    instance.getRepository().findOne({id: req.params.id}).then((rs)=>{
      if(rs){
        next()
      }else{
        next({name:"NotFound"})
      }
    }).catch(next)
  } 
}