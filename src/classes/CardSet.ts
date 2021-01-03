import { Card } from "./Card";
import { CardTypeDescriptions } from "../models/CardTypeDescriptions";
import { CardType } from "../models/CardTypes";

export class CardSet {
    cards: Card[] = [
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 76),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 0),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 0),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 0),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 0),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, -10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, -10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, -10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, -10),
        new Card(CardType.Double, CardTypeDescriptions.Double),
        new Card(CardType.Double, CardTypeDescriptions.Double),
        new Card(CardType.Double, CardTypeDescriptions.Double),
        new Card(CardType.Double, CardTypeDescriptions.Double),
        new Card(CardType.ChangeDirection, CardTypeDescriptions.ChangeDirection),
        new Card(CardType.ChangeDirection, CardTypeDescriptions.ChangeDirection),
        new Card(CardType.ChangeDirection, CardTypeDescriptions.ChangeDirection),
        new Card(CardType.ChangeDirection, CardTypeDescriptions.ChangeDirection),
        new Card(CardType.ChangeDirection, CardTypeDescriptions.ChangeDirection),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 11),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 22),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 33),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 44),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 55),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 66),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 10),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 2),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 2),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 2),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 3),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 3),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 3),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 4),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 4),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 4),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 5),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 5),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 5),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 6),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 6),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 6),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 7),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 7),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 7),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 8),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 8),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 8),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 9),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 9),
        new Card(CardType.Normal, CardTypeDescriptions.Normal, 9),
    ];
    playedCards: Card[] = []

    constructor() {
        this.shuffle();
    }

    shuffle(): void {
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

    playCard(card: Card) {
        this.playedCards.push(card);
    }

    drawMultiple(count: number) {
        const cards: Card[] = []
        if (this.count() < count) {
            this.useOldCards();
        }
        for (let i = count; i > 0; i--) {

            let c = this.cards.pop()
            if (c) cards.push();
        }
        return cards;
    }

    count(): number {
        return this.cards.length;
    }

    useOldCards() {
        this.cards = this.playedCards.concat(this.cards);
        this.playedCards = [];
        this.shuffle();
    }

    returnCards(cards: Card[]) {
        this.cards = this.playedCards.concat(this.cards);
        this.shuffle()
    }
}