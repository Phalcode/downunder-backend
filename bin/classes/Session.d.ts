import { Player } from "./Player";
import { CardSet } from "./CardSet";
import { ISession } from "../models/ISession";
export declare class Session implements ISession {
    id: string;
    cardset: CardSet;
    count: number;
    chips: number;
    players: Player[];
    maxPlayers: number;
    hidden: boolean;
    constructor(chips?: number, maxPlayers?: number, hidden?: boolean);
    join(username: string, ip: string): void;
    leave(playerId: string): void;
}
