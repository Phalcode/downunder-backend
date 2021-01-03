import { CardType } from '../models/CardTypes';
import { ICard } from '../models/ICard';
import { nanoid } from 'nanoid';
export class Card implements ICard {
    id = nanoid(5);
    type: CardType;
    description: string;
    value?: number;

    constructor(type: CardType, description: string, value?: number) {
        this.type = type;
        this.description = description;
        if (type == CardType.Normal && value) this.value = value;
    }
};