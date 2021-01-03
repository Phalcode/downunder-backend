import { Player } from "../models/Player";
import { nanoid } from 'nanoid';
import { Card } from "../models/Card";
import { CardType } from "../models/CardTypes";
import { CardSet } from "./CardSet";

export class Session {
    id = nanoid;
    players: Player[] = [];
    public cardset: CardSet = new CardSet();
    count: number = 0;
  
    constructor() {
    }
  }