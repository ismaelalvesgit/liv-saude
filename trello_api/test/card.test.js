//@Author ismael alves
import request from 'supertest'

const address = global.address
const token = `teste`
import Card from '../src/models/card'
import data from './fixtures/data'

//antes de todo teste
afterEach(async () => {
    await new Card().getRepository().query('DELETE FROM "card"')
})

describe('Fluxo de tratamento de erros', () => {

    test('get - card por id sem o Secret', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).get(`/card/${card.id}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('get - card sem o Secret', async () => {
        return request(address).get('/card')
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('del - card sem o Secret', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).del(`/card/${card.id}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('put - card sem o Secret', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).put(`/card/${card.id}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('post - card sem o Secret', async () => {
        return request(address).post('/card')
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('put - card atualização sem os dados necessarios', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).put(`/card/${card.id}`)
        .set('authorization', token)
        .send({
            teste: "ola"
        })
        .then(response => {
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('nome e requirido')
        }).catch(fail)
    })

    test('post - card cadastro sem os dados necessarios', async () => {
        return request(address).post('/card')
        .set('authorization', token)
        .send({
            teste: "ola"
        })
        .then(response => {
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('nome e requirido')
        }).catch(fail)
    })

    test('get - card por ID com ID errado', async () => {
        return request(address).get(`/card/100000000`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('del - card com ID errado', async () => {
        return request(address).del(`/card/100000000`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('put - card com ID errado', async () => {
        return request(address).put(`/card/100000000`)
        .set('authorization', token)
        .send(data[1])
        .then(response => {
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })
})

describe('Fluxo normal de dados', () => {

    test('get - card todos', async () => {
        // Motando o cenario
        await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).get(`/card`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items.length).toBeGreaterThan(0)
            expect(response.body).toHaveProperty('_links')
            expect(response.body.items[0]).toHaveProperty('nome')
            expect(response.body.items[0]).toHaveProperty('id')
            expect(response.body.items[0]).toHaveProperty('dataRegistro')
            expect(response.body.items[0]).toHaveProperty('dataAtualizacao')
        }).catch(fail)
    })

    test('get - card por ID', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).get(`/card/${card.id}`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('_links')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
        }).catch(fail)
    })

    test('del - card', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).del(`/card/${card.id}`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(204)
        }).catch(fail)
    })

    test('put - card', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })
        
        return request(address).put(`/card/${card.id}`)
        .set('authorization', token)
        .send(data[1])
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.nome).toBe(data[1].nome)
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
        }).catch(fail)
    })

    test('post - card', async () => {
        return request(address).post('/card')
        .set('authorization', token)
        .send(data[0])
        .then(response => {
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
        }).catch(fail)
    })

})