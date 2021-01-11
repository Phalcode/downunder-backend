import { IPlayer } from "./IPlayer";
export interface ISession {
    readonly id?: string;
    readonly name: string;
    readonly chips: number;
    readonly maxPlayers: number;
    count?: number;
    players?: IPlayer[];
}
