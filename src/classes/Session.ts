import { Player } from "./Player";
import { nanoid } from 'nanoid';
import { CardSet } from "./CardSet";
import { ISession } from "../models/ISession";

export class Session implements ISession {
    id = nanoid(5);
    cardset: CardSet = new CardSet();
    count: number = 0;
    chips: number;
    players: Player[] = [];
    maxPlayers: number;
    hidden: boolean;

    constructor(chips = 3, maxPlayers = 8, hidden = false) {
        this.chips = chips;
        this.maxPlayers = maxPlayers;
        this.hidden = hidden;
    }

    join(username: string, ip: string) {
        if (this.players.length < this.maxPlayers) {
            const newPlayer = new Player(username, ip, this.cardset.drawMultiple(5), this.chips)
            this.players.push(newPlayer);
        }
    }

    leave(playerId: string) {
        const leavingPlayer = this.players.find(player => player.id = playerId);
        if (leavingPlayer) {
            this.cardset.returnCards(leavingPlayer.cards);
            this.players.splice(this.players.indexOf(leavingPlayer), 1);
        }
    }
}