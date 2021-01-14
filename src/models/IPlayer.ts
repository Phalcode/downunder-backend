import { Card } from "../classes/Card";

export interface IPlayer {
  username: string;
  cards?: Card[];
  id?: string;
  chips?: number;
  turn?: boolean;
}
