import { Card } from "./Card";
export declare class CardSet {
    cards: Card[];
    playedCards: Card[];
    constructor();
    shuffle(): void;
    draw(): Card | undefined;
    playCard(card: Card): void;
    drawMultiple(count: number): Card[];
    count(): number;
    useOldCards(): void;
    returnCards(cards: Card[]): void;
}
