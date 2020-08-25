// @Author Ismael Alves
import { BaseModel } from './base';
import { Lista } from './lista.model';

export class Card extends BaseModel {

    constructor(init?: Partial<Card>) {
        super()
        Object.assign(this, init);
    }

    nome:string
    listas:Lista[]
    view:boolean = false
}
