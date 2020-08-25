//@Author ismael alves

module.exports = function(app){

	// rota inicial de apresentação
	app.get('/', (req, resp, next)=>{
		resp.json('TRELLO API VERSÃO 0.1 ON')	
	})

	// retirar o favicon.ico por default
	app.get('/favicon.ico', (req, res) =>{
		res.status(204)
	})

}