import { IPlayer } from '../models/IPlayer';
import { Card } from './Card';
export declare class Player implements IPlayer {
    id: string;
    username: string;
    ip: string;
    cards: Card[];
    chips: number;
    turn: boolean;
    constructor(username: string, ip: string, cards: Card[], chips?: number);
}
