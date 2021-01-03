import { Player } from "./Player";
import { nanoid } from 'nanoid';
import { CardSet } from "./CardSet";
import { ISession } from "../models/ISession";
import { Card } from "./Card";
import { CardType } from "../models/CardTypes";

export class Session implements ISession {
    readonly name: string;
    readonly chips: number;
    readonly maxPlayers: number;
    readonly hidden: boolean;
    readonly id = nanoid(5);
    cardset: CardSet = new CardSet();
    players: Player[] = [];
    count: number = 0;
    turn: number = 0;
    doubleTurn: boolean = false;
    reverse: boolean = false;

    constructor(name: string, chips = 3, maxPlayers = 8, hidden = false) {
        this.name = name;
        this.chips = chips;
        this.maxPlayers = maxPlayers;
        this.hidden = hidden;
    }

    reset() {
        for (const player of this.players) {
            player.cards = [];
            player.chips = this.chips;
        }
        this.cardset = new CardSet();
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

    nextTurn() {
        if (this.doubleTurn) {
            this.doubleTurn = false;
            return;
        }

        if (!this.reverse) {
            this.turn < this.players.length ? this.turn++ : this.turn = 0;
        } else {
            this.turn >= 0 ? this.turn-- : this.turn = this.players.length;
        }
    }

    changeDirection() {
        this.reverse = !this.reverse;
    }

    playCard(session: Session, player: Player, card: Card) {
        switch (card.type) {
            case CardType.Normal: {
                session.count += card?.value || 0;
                player.cards.splice(player.cards.indexOf(card), 1);
                session.cardset.playCard(card);
                break
            }
            case CardType.Double: {
                break
            }
            case CardType.ChangeDirection: {
                this.changeDirection();
                break
            }
        }
    }
}