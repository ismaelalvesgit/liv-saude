import { getRepository } from 'typeorm'
import entity from '../entity/card'
import { Base } from './base';

export default class Card extends Base{
    constructor(init){
        super();
        if(init){
            Object.assign(this, init); 
        }
    }

    id
    nome

    getRepository(){
        return getRepository(entity)
    }

    collection(){
        return "card"
    }
}
