import { CardType } from "./CardTypes";
export interface ICard {
    id: string;
    type: CardType;
    description: string;
    value?: number;
}
