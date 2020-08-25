//@Author ismael alves
import { EntitySchema, } from 'typeorm'
import { Card } from '../models/card'

export default new EntitySchema({
    name: "card",
    target: Card,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        nome: {
            type: 'varchar',
            nullable: false
        },
        dataRegistro: {
            name: 'dataRegistro',
            type: 'timestamp',
            createDate: true,
        } ,
        dataAtualizacao: {
            name: 'dataAtualizacao',
            type: 'timestamp',
            updateDate: true,
        },
    }
})