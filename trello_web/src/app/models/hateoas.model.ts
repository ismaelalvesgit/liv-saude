// @Author Ismael Alves

export class Hateoas {

    constructor(init?: Partial<Hateoas>) {
        Object.assign(this, init);
    }

    self: string;
    all: string;
    remaining: number;
    total: number;
}
