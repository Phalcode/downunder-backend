import { CardType } from './CardTypes';
export class Card {
    public type: CardType;
    public description: string;
    public value?: number;

    constructor(type: CardType, description: string, value?: number) {
        this.type = type;
        this.description = description;
        if (type == CardType.Normal && value) this.value = value;
    }
};