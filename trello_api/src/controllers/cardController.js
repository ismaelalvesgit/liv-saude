//@Author ismael alves
import authorize from '../middlewares/handlerAuthorizeMiddleware'
import Card from '../models/card'
import cardValidator from '../validators/cardValidator'
import verifyHandlerMiddleware from '../middlewares/verifiyHandlerMiddleware'
import controllerBase from '../utils/controllerBase'
import validadeId from '../middlewares/handlerValidateIdMiddleware'
import Lista from '../models/lista'

module.exports = function(app){

	// Metodo que pegar todos os cards
	app.get('/card', [
		authorize(),
		controllerBase.findAll({
			model: Card,
			sort: {dataRegistro: 'ASC'}
		}),
	])

	// Metodo que pegar os cards por id
	app.get('/card/:id', [
		authorize(),
		controllerBase.findById({
			model: Card
		})
	])

	// Metodo que deletar os cards
	app.delete('/card/:id', [
		authorize(),
		controllerBase.delete({
			model: Card
		})
	])

	// Metodo que atualizar os cards
	app.put('/card/:id', [
		authorize(),
		validadeId(Card),
		cardValidator.cardCadastro(),
		verifyHandlerMiddleware,
		controllerBase.update({
			model: Card
		})
	])

	// Metodo que cadastra os cards
	app.post('/card', [
		authorize(),
		cardValidator.cardCadastro(),
		verifyHandlerMiddleware,
		controllerBase.save({
			model: Card
		})
	])
}