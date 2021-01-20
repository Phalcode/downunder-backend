import { nanoid } from "nanoid";
import { IPlayer } from "../models/IPlayer";
import { Card } from "./Card";
import axios from "axios";
import { PlayerStateEnum } from "../models/PlayerStateEnum";
export class Player implements IPlayer {
  id = nanoid(5);
  username: string;
  ip: string;
  cards: Card[] = [];
  chips: number;
  turn: boolean = false;
  imageUrl: string = "";
  state: PlayerStateEnum = PlayerStateEnum.Ingame;

  constructor(username: string, ip: string, cards: Card[], chips: number = 3) {
    this.username = username;
    this.ip = ip;
    this.cards = cards;
    this.chips = chips;
  }

  async getImageUrl() {
    const data = await (await axios.get("https://fakeface.rest/face/json"))
      .data;
    this.imageUrl = data.image_url;
  }
}
