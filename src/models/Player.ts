import { nanoid } from 'nanoid';
import { Card } from './Card';
export class Player {
    username: string;
    ip: string;
    id = nanoid();
    cards: Card[] = [];
    chips: number;

    constructor(username: string, ip: string, cards: Card[], chips: number = 3) {
        this.username = username;
        this.ip = ip;
        this.cards = cards;
        this.chips = chips;
    }
};