import { CardSet } from "../classes/CardSet";
import { IPlayer } from "./IPlayer";

export interface ISession {
    id: string;
    count: number;
    chips: number;
    players: IPlayer[];
    maxPlayers: number;
    hidden: boolean;
}