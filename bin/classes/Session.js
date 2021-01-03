"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const Player_1 = require("./Player");
const nanoid_1 = require("nanoid");
const CardSet_1 = require("./CardSet");
const CardTypes_1 = require("../models/CardTypes");
class Session {
    constructor(name, chips = 3, maxPlayers = 8, hidden = false) {
        this.id = nanoid_1.nanoid(5);
        this.cardset = new CardSet_1.CardSet();
        this.players = [];
        this.count = 0;
        this.turn = 0;
        this.doubleTurn = false;
        this.reverse = false;
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
        this.cardset = new CardSet_1.CardSet();
    }
    join(username, ip) {
        if (this.players.length < this.maxPlayers) {
            const newPlayer = new Player_1.Player(username, ip, this.cardset.drawMultiple(5), this.chips);
            this.players.push(newPlayer);
        }
    }
    leave(playerId) {
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
        }
        else {
            this.turn >= 0 ? this.turn-- : this.turn = this.players.length;
        }
    }
    changeDirection() {
        this.reverse = !this.reverse;
    }
    playCard(session, player, card) {
        switch (card.type) {
            case CardTypes_1.CardType.Normal: {
                session.count += card?.value || 0;
                player.cards.splice(player.cards.indexOf(card), 1);
                session.cardset.playCard(card);
                break;
            }
            case CardTypes_1.CardType.Double: {
                break;
            }
            case CardTypes_1.CardType.ChangeDirection: {
                this.changeDirection();
                break;
            }
        }
    }
}
exports.Session = Session;
