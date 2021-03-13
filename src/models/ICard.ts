import { CardTypeEnum } from "./CardTypeEnum";

export interface ICard {
  readonly id: string;
  readonly type: CardTypeEnum;
  readonly description: string;
  readonly value?: number;
  readonly source?: string;
}
