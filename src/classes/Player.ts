import { nanoid } from "nanoid";
import { IPlayer } from "../models/IPlayer";
import { Card } from "./Card";
import axios from "axios";
import { PlayerStateEnum } from "../models/PlayerStateEnum";
import { Socket } from "socket.io";
import rfdc from "rfdc";
export class Player implements IPlayer {
    id = nanoid(5);
    username: string;
    cards: Card[] = [];
    chips: number;
    turn: boolean = false;
    imageUrl: string = "";
    socketId: string;
    state: PlayerStateEnum = PlayerStateEnum.Ingame;

    constructor(
        username: string,
        socketId: string,
        cards: Card[],
        chips: number = 3
    ) {
        this.username = username;
        this.socketId = socketId;
        this.cards = cards;
        this.chips = chips;
    }

    async getImageUrl() {
        const data = await (await axios.get("https://fakeface.rest/face/json"))
            .data;
        this.imageUrl = data.image_url;
    }

    getStrippedPlayer(): IPlayer {
        return rfdc()<IPlayer>(this);
    }
}
