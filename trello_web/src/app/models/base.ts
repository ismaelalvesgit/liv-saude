// @Author Ismael Alves

import { Hateoas } from './hateoas.model';

export class BaseModel {

    constructor(init?: Partial<BaseModel>) {
        Object.assign(this, init);
    }
    _links: Hateoas;
    id:number
    dataRegistro: Date
    dataAtualizacao: Date
}
