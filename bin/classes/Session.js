"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const Player_1 = require("./Player");
const nanoid_1 = require("nanoid");
const CardSet_1 = require("./CardSet");
class Session {
    constructor(chips = 3, maxPlayers = 8, hidden = false) {
        this.id = nanoid_1.nanoid(5);
        this.cardset = new CardSet_1.CardSet();
        this.count = 0;
        this.players = [];
        this.chips = chips;
        this.maxPlayers = maxPlayers;
        this.hidden = hidden;
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
}
exports.Session = Session;
