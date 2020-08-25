//@Author ismael alves
import request from 'supertest'

const address = global.address
const token = `teste`
import lista from '../src/models/lista'
import Card from '../src/models/card'
import data from './fixtures/data'
import Lista from '../src/models/lista'

//antes de todo teste
afterEach(async () => {
    await new lista().getRepository().query('DELETE FROM "lista"')
    await new Card().getRepository().query('DELETE FROM "card"')
})

describe('Fluxo de tratamento de erros', () => {

    test('get - lista por id sem o Secret', async () => {
        // Motando o cenario
        let lista = await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).get(`/lista/${lista.id}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('get - lista sem o Secret', async () => {
        return request(address).get('/lista')
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('del - lista sem o Secret', async () => {
        // Motando o cenario
        let lista = await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).del(`/lista/${lista.id}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('put - lista sem o Secret', async () => {
        // Motando o cenario
        let lista = await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).put(`/lista/${lista.id}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('post - lista sem o Secret', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).post(`/lista/${card.id}`)
        .then(response=>{
            expect(response.status).toBe(403)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Secret não encontrado')
        }).catch(fail)
    })

    test('put - lista atualização sem os dados necessarios', async () => {
        // Motando o cenario
        let lista = await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).put(`/lista/${lista.id}`)
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

    test('post - lista cadastro sem os dados necessarios', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).post(`/lista/${card.id}`)
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

    test('get - lista por ID com ID errado', async () => {
        return request(address).get(`/lista/100000000`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('del - lista com ID errado', async () => {
        return request(address).del(`/lista/100000000`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('put - lista com ID errado', async () => {
        return request(address).put(`/lista/100000000`)
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


    test('get - lista todos por card', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })
        await new Lista().getRepository().save({ nome: data[0].nome, card: card.id })

        return request(address).get(`/lista/${card.id}/card`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items.length).toBeGreaterThan(0)
            expect(response.body.items[0]).toHaveProperty('nome')
            expect(response.body.items[0]).toHaveProperty('id')
            expect(response.body.items[0]).toHaveProperty('dataRegistro')
            expect(response.body.items[0]).toHaveProperty('dataAtualizacao')
        }).catch(fail)
    })

    test('get - lista todos', async () => {
        // Motando o cenario
        await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).get(`/lista`)
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

    test('get - lista por ID', async () => {
        // Motando o cenario
        let lista = await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).get(`/lista/${lista.id}`)
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

    test('del - lista', async () => {
        // Motando o cenario
        let lista = await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).del(`/lista/${lista.id}`)
        .set('authorization', token)
        .then(response => {
            expect(response.status).toBe(204)
        }).catch(fail)
    })

    test('put - lista', async () => {
        // Motando o cenario
        let lista = await new Lista().getRepository().save({ nome: data[0].nome })

        return request(address).put(`/lista/${lista.id}`)
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

    test('post - lista', async () => {
        // Motando o cenario
        let card = await new Card().getRepository().save({ nome: data[0].nome })

        return request(address).post(`/lista/${card.id}`)
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