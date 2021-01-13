import { CardType } from '../models/CardTypes';
import { ICard } from '../models/ICard';
import { nanoid } from 'nanoid';
export class Card implements ICard {
    readonly id = nanoid(5);
    readonly type: CardType;
    readonly description: string;
    readonly value?: number;
    readonly source?: string;

    constructor(type: CardType, description: string, value?: number, source?: string) {
        this.type = type;
        this.description = description;
        this.source = source;
        if (type == CardType.Normal && value) this.value = value;
    }
};