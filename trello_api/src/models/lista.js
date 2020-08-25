//@Author ismael alves
import { getRepository } from 'typeorm'
import entity from '../entity/lista'
import { Base } from './base';

export default class Lista extends Base{
    constructor(init){
        super()
        if(init){
            Object.assign(this, init); 
        }
    }

    id
    nome
    card

    getRepository(){
        return getRepository(entity)
    }

    collection(){
        return "lista"
    }
}
