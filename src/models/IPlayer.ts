import { Socket } from "socket.io";
import { Card } from "../classes/Card";
import { PlayerStateEnum } from "./PlayerStateEnum";

export interface IPlayer {
    username: string;
    cards?: Card[];
    id?: string;
    socket?: Socket;
    chips?: number;
    turn?: boolean;
    imageUrl?: string;
    state?: PlayerStateEnum;
}
