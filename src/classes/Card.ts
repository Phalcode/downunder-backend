import { CardTypeEnum } from "../models/CardTypeEnum";
import { ICard } from "../models/ICard";
import { nanoid } from "nanoid";
export class Card implements ICard {
  readonly id = nanoid(5);
  readonly type: CardTypeEnum;
  readonly description: string;
  readonly value?: number;
  readonly source?: string;

  constructor(
    type: CardTypeEnum,
    description: string,
    value?: number,
    source?: string
  ) {
    this.type = type;
    this.description = description;
    this.source = source;
    if (type === CardTypeEnum.Normal && value) this.value = value;
  }
}
