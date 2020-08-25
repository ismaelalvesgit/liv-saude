// @Author Ismael Alves

import { Card } from './card';
import { BaseModel } from './base';

export class Lista extends BaseModel {

    constructor(init?: Partial<Lista>) {
        super();
        Object.assign(this, init);
    }
    
    card: Card[]
    nome:number
    view:boolean = false
}
