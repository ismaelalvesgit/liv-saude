
//@Author ismael alves
import { EntitySchema, } from 'typeorm'
import { Lista } from '../models/lista'

export default new EntitySchema({
    name: "lista",
    target: Lista,
    columns: {
        id: {
            type: "int",
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
        },
        dataAtualizacao: {
            name: 'dataAtualizacao',
            type: 'timestamp',
            updateDate: true,
        },
    },
    relations: {
        card: {
            type: 'many-to-one',
            target: 'card',
            joinColumn: 'cardId',
            cascade: true,
            joinTable: true,
            eager: true
        }
    }
})