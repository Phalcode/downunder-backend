"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSet = void 0;
const Card_1 = require("./Card");
const CardTypeDescriptions_1 = require("../models/CardTypeDescriptions");
const CardTypes_1 = require("../models/CardTypes");
class CardSet {
    constructor() {
        this.cards = [
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 76, "../../../assets/cards/76.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
            new Card_1.Card(CardTypes_1.CardType.Double, CardTypeDescriptions_1.CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
            new Card_1.Card(CardTypes_1.CardType.ChangeDirection, CardTypeDescriptions_1.CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 11, "../../../assets/cards/11.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 22, "../../../assets/cards/22.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 33, "../../../assets/cards/33.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 44, "../../../assets/cards/44.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 55, "../../../assets/cards/55.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 66, "../../../assets/cards/66.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 2, "../../../assets/cards/2.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 2, "../../../assets/cards/2.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 2, "../../../assets/cards/2.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 3, "../../../assets/cards/3.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 3, "../../../assets/cards/3.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 3, "../../../assets/cards/3.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 4, "../../../assets/cards/4.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 4, "../../../assets/cards/4.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 4, "../../../assets/cards/4.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 5, "../../../assets/cards/5.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 5, "../../../assets/cards/5.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 5, "../../../assets/cards/5.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 6, "../../../assets/cards/6.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 6, "../../../assets/cards/6.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 6, "../../../assets/cards/6.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 7, "../../../assets/cards/7.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 7, "../../../assets/cards/7.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 7, "../../../assets/cards/7.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 8, "../../../assets/cards/8.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 8, "../../../assets/cards/8.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 8, "../../../assets/cards/8.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 9, "../../../assets/cards/9.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 9, "../../../assets/cards/9.svg"),
            new Card_1.Card(CardTypes_1.CardType.Normal, CardTypeDescriptions_1.CardTypeDescriptions.Normal, 9, "../../../assets/cards/9.svg")
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
