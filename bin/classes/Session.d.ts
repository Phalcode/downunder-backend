import { Player } from "./Player";
import { CardSet } from "./CardSet";
import { ISession } from "../models/ISession";
import { Card } from "./Card";
export declare class Session implements ISession {
    readonly name: string;
    readonly chips: number;
    readonly maxPlayers: number;
    readonly id: string;
    cardset: CardSet;
    players: Player[];
    count: number;
    turn: number;
    doubleTurn: boolean;
    reverse: boolean;
    constructor(name: string, chips?: number, maxPlayers?: number);
    reset(): void;
    join(username: string, ip: string): Player;
    leave(playerId: string): void;
    nextTurn(): void;
    changeDirection(): void;
    playCard(session: Session, player: Player, card: Card): void;
}
