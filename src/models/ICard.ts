import { CardType } from "./CardTypes";

export interface ICard {
    readonly id: string
    readonly type: CardType;
    readonly description: string;
    readonly value?: number;
}