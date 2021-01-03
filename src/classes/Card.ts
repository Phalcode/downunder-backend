import { CardType } from '../models/CardTypes';
import { ICard } from '../models/ICard';
import { nanoid } from 'nanoid';
export class Card implements ICard {
    readonly id = nanoid(5);
    readonly type: CardType;
    readonly description: string;
    readonly value?: number;

    constructor(type: CardType, description: string, value?: number) {
        this.type = type;
        this.description = description;
        if (type == CardType.Normal && value) this.value = value;
    }
};