//@Author ismael alves
import authorize from '../middlewares/handlerAuthorizeMiddleware'
import Lista from '../models/lista'
import Card from '../models/card'
import listaValidator from '../validators/listaValidator'
import verifyHandlerMiddleware from '../middlewares/verifiyHandlerMiddleware'
import validadeId from '../middlewares/handlerValidateIdMiddleware'
import controllerBase from '../utils/controllerBase'

module.exports = function(app){

	// Metodo que pegar todos os listas
	app.get('/lista/:id/card', [
		authorize(),
		// controllerBase.findAll({
		// 	model: Lista,
		// 	condition: {
		// 		card: "id"
		// 	},
		// 	pageSize: 10000,
		// 	params: [
		// 		{
		// 			path: 'card',
		// 			params: 'id'
		// 		}
		// 	],
		// 	skipLinks: true
		// }),
		(req, resp, next)=>{
			new Lista().getRepository().find({where: {card: req.params.id}, order: {dataRegistro: 'ASC'}}).then((rs)=>{
				resp.json({items: rs})
			})
		}
	])

	// Metodo que pegar todos os listas
	app.get('/lista', [
		authorize(),
		controllerBase.findAll({
			model: Lista
		})
	])

	// Metodo que pegar uma lista por id
	app.get('/lista/:id', [
		authorize(),
		controllerBase.findById({
			model: Lista
		})
	])

	// Metodo que deletar uma lista
	app.delete('/lista/:id', [
		authorize(),
		controllerBase.delete({
			model: Lista
		})
	])

	// Metodo que atualizar uma lista
	app.put('/lista/:id', [
		authorize(),
		validadeId(Lista),
		listaValidator.cardCadastro(),
		verifyHandlerMiddleware,
		controllerBase.update({
			model: Lista
		})
	])

	// Metodo que cadastra uma lista
	app.post('/lista/:id', [
		authorize(),
		validadeId(Card),
		listaValidator.cardCadastro(),
		verifyHandlerMiddleware,
		controllerBase.save({
			model: Lista,
			addFields: [
				{
					path: "card",
					params: 'id'
				}
			]
		})
	])
}