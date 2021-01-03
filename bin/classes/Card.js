"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const CardTypes_1 = require("../models/CardTypes");
const nanoid_1 = require("nanoid");
class Card {
    constructor(type, description, value) {
        this.id = nanoid_1.nanoid(5);
        this.type = type;
        this.description = description;
        if (type == CardTypes_1.CardType.Normal && value)
            this.value = value;
    }
}
exports.Card = Card;
;
