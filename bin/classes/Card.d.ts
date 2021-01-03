import { CardType } from '../models/CardTypes';
import { ICard } from '../models/ICard';
export declare class Card implements ICard {
    id: string;
    type: CardType;
    description: string;
    value?: number;
    constructor(type: CardType, description: string, value?: number);
}
