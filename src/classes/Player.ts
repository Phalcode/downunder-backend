import { nanoid } from 'nanoid';
import { IPlayer } from '../models/IPlayer';
import { Card } from './Card';
export class Player implements IPlayer {
    id = nanoid(5);
    username: string;
    ip: string;
    cards: Card[] = [];
    chips: number;
    turn: boolean = false;

    constructor(username: string, ip: string, cards: Card[], chips: number = 3) {
        this.username = username;
        this.ip = ip;
        this.cards = cards;
        this.chips = chips;
    }
};