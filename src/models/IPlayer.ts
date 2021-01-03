import { ICard } from "./ICard";

export interface IPlayer {
    id: string;
    username: string;
    cards: ICard;
    chips: number;
}