import { CardType } from '../models/CardTypes';
import { ICard } from '../models/ICard';
export declare class Card implements ICard {
    readonly id: string;
    readonly type: CardType;
    readonly description: string;
    readonly value?: number;
    readonly source?: string;
    constructor(type: CardType, description: string, value?: number, source?: string);
}
