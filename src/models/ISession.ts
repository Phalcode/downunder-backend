import { CardSet } from "../classes/CardSet";
import { SessionStateEnum as SessionStateEnum } from "./SessionStateEnum";
import { IPlayer } from "./IPlayer";

export interface ISession {
  readonly id?: string;
  readonly SETTING_NAME: string;
  readonly SETTING_CHIPS: number;
  readonly SETTING_MAX_PLAYERS: number;
  readonly SETTING_MAX_COUNT: number;
  count?: number;
  players?: IPlayer[];
  state?: SessionStateEnum;
  cardset?: CardSet;
}
