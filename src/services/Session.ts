import { Player } from "../models/Player";
import { nanoid } from 'nanoid';
import { CardSet } from "./CardSet";

export class Session {
    id = nanoid;
    players: Player[] = [];
    public cardset: CardSet = new CardSet();
    count: number = 0;
    chips = 3;

    constructor() {
    }

    join(username: string, ip: string) {
        this.players.push(new Player(username, ip, this.cardset.drawMultiple(5), this.chips))
    }

    leave(playerId: string) {
        const leavingPlayer = this.players.find(player => player.id = playerId);
        if (leavingPlayer) {
            this.cardset.returnCards(leavingPlayer.cards);
            this.players.splice(this.players.indexOf(leavingPlayer), 1);
        }
    }
}