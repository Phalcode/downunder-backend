import { Card } from "./Card";
import { CardTypeDescriptions } from "../models/CardTypeDescriptions";
import { CardTypeEnum } from "../models/CardTypeEnum";
import { ICardSet } from "../models/ICardSet";

export class CardSet implements ICardSet {
  cards: Card[] = [
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 76, "../../../assets/cards/76.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 0, "../../../assets/cards/0.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, -10, "../../../assets/cards/m10.svg"),
    new Card(CardTypeEnum.Double, CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
    new Card(CardTypeEnum.Double, CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
    new Card(CardTypeEnum.Double, CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
    new Card(CardTypeEnum.Double, CardTypeDescriptions.Double, undefined, "../../../assets/cards/double.svg"),
    new Card(CardTypeEnum.ChangeDirection, CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
    new Card(CardTypeEnum.ChangeDirection, CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
    new Card(CardTypeEnum.ChangeDirection, CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
    new Card(CardTypeEnum.ChangeDirection, CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
    new Card(CardTypeEnum.ChangeDirection, CardTypeDescriptions.ChangeDirection, undefined, "../../../assets/cards/reverse.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 11, "../../../assets/cards/11.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 22, "../../../assets/cards/22.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 33, "../../../assets/cards/33.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 44, "../../../assets/cards/44.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 55, "../../../assets/cards/55.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 66, "../../../assets/cards/66.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 10, "../../../assets/cards/10.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 2, "../../../assets/cards/2.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 2, "../../../assets/cards/2.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 2, "../../../assets/cards/2.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 3, "../../../assets/cards/3.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 3, "../../../assets/cards/3.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 3, "../../../assets/cards/3.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 4, "../../../assets/cards/4.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 4, "../../../assets/cards/4.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 4, "../../../assets/cards/4.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 5, "../../../assets/cards/5.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 5, "../../../assets/cards/5.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 5, "../../../assets/cards/5.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 6, "../../../assets/cards/6.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 6, "../../../assets/cards/6.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 6, "../../../assets/cards/6.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 7, "../../../assets/cards/7.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 7, "../../../assets/cards/7.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 7, "../../../assets/cards/7.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 8, "../../../assets/cards/8.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 8, "../../../assets/cards/8.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 8, "../../../assets/cards/8.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 9, "../../../assets/cards/9.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 9, "../../../assets/cards/9.svg"),
    new Card(CardTypeEnum.Normal, CardTypeDescriptions.Normal, 9, "../../../assets/cards/9.svg")
  ];
  playedCards: Card[] = [];

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
    const cards: Card[] = [];
    if (this.count() < count) {
      this.useOldCards();
    }
    for (let i = count; i > 0; i--) {
      let card = this.cards.pop();
      if (card) cards.push(card);
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
    this.shuffle();
  }
}
