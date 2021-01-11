"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSet = void 0;
const Card_1 = require("./Card");
const CardTypeDescriptions_1 = require("../models/CardTypeDescriptions");
const CardTypes_1 = require("../models/CardTypes");
class CardSet {
    constructor() {
        this.cards = [
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 76),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 11),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 22),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 33),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 44),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 55),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 66),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 2),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 2),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 2),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 3),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 3),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 3),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 4),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 4),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 4),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 5),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 5),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 5),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 6),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 6),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 6),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 7),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 7),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 7),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 8),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 8),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 8),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 9),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 9),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 9),
        ];
        this.playedCards = [];
        this.shuffle();
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    draw() {
        let card = this.cards.pop();
        if (!card) {
            this.useOldCards();
            card = this.cards.pop();
        }
        return card;
    }
    playCard(card) {
        this.playedCards.push(card);
    }
    drawMultiple(count) {
        const cards = [];
        if (this.count() < count) {
            this.useOldCards();
        }
        for (let i = count; i > 0; i--) {
            let card = this.cards.pop();
            if (card)
                cards.push(card);
        }
        return cards;
    }
    count() {
        return this.cards.length;
    }
    useOldCards() {
        this.cards = this.playedCards.concat(this.cards);
        this.playedCards = [];
        this.shuffle();
    }
    returnCards(cards) {
        this.cards = this.playedCards.concat(this.cards);
        this.shuffle();
    }
}
exports.CardSet = CardSet;
