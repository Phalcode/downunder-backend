"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const nanoid_1 = require("nanoid");
class Player {
    constructor(username, ip, cards, chips = 3) {
        this.id = nanoid_1.nanoid(5);
        this.cards = [];
        this.turn = false;
        this.username = username;
        this.ip = ip;
        this.cards = cards;
        this.chips = chips;
    }
}
exports.Player = Player;
;
