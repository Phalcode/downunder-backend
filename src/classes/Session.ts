import { Player } from "./Player";
import { nanoid } from "nanoid";
import { CardSet } from "./CardSet";
import { ISession } from "../models/ISession";
import { Card } from "./Card";
import { CardTypeEnum } from "../models/CardTypeEnum";
import { Errors } from "../models/Errors";
import { IPlayer } from "../models/IPlayer";
import { PlayerStateEnum } from "../models/PlayerStateEnum";
import { SessionStateEnum } from "../models/SessionStateEnum";

export class Session implements ISession {
  readonly id = nanoid(5);
  readonly SETTING_NAME: string;
  readonly SETTING_CHIPS: number;
  readonly SETTING_MAX_PLAYERS: number;
  readonly SETTING_MAX_COUNT: number;
  state: SessionStateEnum = SessionStateEnum.Running;
  cardset: CardSet = new CardSet();
  players: Player[] = [];
  count: number = 0;
  turn: number = 0;
  doubleTurn: boolean = false;
  reverse: boolean = false;
  private doubleTurnActivator: number = -1;

  constructor(
    SETTING_NAME: string,
    SETTING_CHIPS = 3,
    SETTING_MAX_PLAYERS = 8,
    SETTING_MAX_COUNT = 77
  ) {
    this.SETTING_NAME = SETTING_NAME;
    this.SETTING_CHIPS = SETTING_CHIPS;
    this.SETTING_MAX_PLAYERS = SETTING_MAX_PLAYERS;
    this.SETTING_MAX_COUNT = SETTING_MAX_COUNT;
  }

  async reset() {
    this.cardset = new CardSet();
    this.state = SessionStateEnum.Running;
    for (const player of this.players) {
      await player.getImageUrl();
      player.state = PlayerStateEnum.Ingame;
      player.chips = this.SETTING_CHIPS;
      player.cards = this.cardset.drawMultiple(5);
    }
    for (let i = this.players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }
    this.players[0].turn = true;
  }

  async join(username: string, ip: string) {
    if (username.length < 3) {
      throw new Error(Errors.ERR_USERNAME_TOO_SHORT);
    }

    if (this.players.length >= this.SETTING_MAX_PLAYERS) {
      throw new Error(Errors.ERR_MAX_PLAYERS);
    }

    if (
      this.players.find(
        (player) => player.username.toLowerCase() === username.toLowerCase()
      )
    ) {
      throw new Error(Errors.ERR_SAME_USERNAME);
    }

    const newPlayer = new Player(
      username,
      ip,
      this.cardset.drawMultiple(5),
      this.SETTING_CHIPS
    );
    await newPlayer.getImageUrl();
    if (this.players.length === 0) {
      newPlayer.turn = true;
    }
    this.players.push(newPlayer);
    return newPlayer;
  }

  leave(playerId: string) {
    const leavingPlayer = this.players.find((player) => (player.id = playerId));
    if (leavingPlayer) {
      this.cardset.returnCards(leavingPlayer.cards);
      this.players.splice(this.players.indexOf(leavingPlayer), 1);
    }
  }

  nextTurn() {
    if (this.players.length === 1) return;
    const wasDoubleTurn = this.doubleTurn;
    if (this.doubleTurn && this.doubleTurnActivator !== this.turn) {
      this.doubleTurn = false;
      return;
    }
    console.log("The Turn is currently: " + this.turn);
    if (!this.reverse) {
      this.turn < this.players.length - 1 ? this.turn++ : (this.turn = 0);
    } else {
      this.turn > 0 ? this.turn-- : (this.turn = this.players.length - 1);
    }
    console.log("The Turn is now: " + this.turn);
    this.players.map((player: IPlayer) => (player.turn = false));
    this.players[this.turn].turn = true;

    //SKIP LOSERS KEEP DOUBLE TURNS
    if (this.players[this.turn].state === PlayerStateEnum.Loser) {
      if (wasDoubleTurn) {
        this.doubleTurn = true;
      }
      this.nextTurn();
    }
  }

  playCard(player: Player, card: Card) {
    switch (card.type) {
      case CardTypeEnum.Normal: {
        this.playNormalCard(player, card);
        break;
      }
      case CardTypeEnum.Double: {
        this.playDoubleTurn();
        break;
      }
      case CardTypeEnum.ChangeDirection: {
        this.playChangeDirection();
        break;
      }
    }
    player.cards.splice(player.cards.indexOf(card), 1);
    this.cardset.playCard(card);
    this.checkGameOver(player);
  }

  removePlayer(player: Player): void {
    this.cardset.returnCards(player.cards);
    this.players.splice(this.players.indexOf(player), 1);
  }

  getStrippedSession(playerId: string): ISession {
    const session: ISession = JSON.parse(JSON.stringify(this));
    session.players?.map((player: IPlayer) => {
      delete session?.cardset?.cards;
      if (player.id !== playerId) {
        delete player.cards;
        delete player.id;
      }
    });
    return session;
  }

  refillPlayerCards(player: Player) {
    for (let i = player.cards.length; i < 5; i++) {
      const drawedcard = this.cardset.draw();
      if (drawedcard) {
        player.cards.push(drawedcard);
      }
    }
  }

  checkIfSessionBegan(): boolean {
    if (
      this.players.find((player) => player.chips < this.SETTING_CHIPS) ||
      this.cardset.playedCards.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  private playNormalCard(player: Player, card: Card) {
    this.count += card?.value || 0;
  }

  private playChangeDirection() {
    this.reverse = !this.reverse;
  }

  private playDoubleTurn() {
    this.doubleTurn = true;
    this.doubleTurnActivator = this.turn;
  }

  private checkGameOver(player: Player) {
    if (this.count >= this.SETTING_MAX_COUNT) {
      //Check Round Over
      player.chips--;
      if (player.chips <= 0) {
        this.cardset.returnCards(player.cards);
        this.doubleTurn = false;
        player.state = PlayerStateEnum.Loser;
      }

      // Reset Round
      this.count = 0;
      this.cardset = new CardSet();
      for (const player of this.players) {
        player.cards = this.cardset.drawMultiple(5);
      }

      // Check Gameover
      const playersIngame = this.players.filter(
        (player: Player) => player.state === PlayerStateEnum.Ingame
      );
      if (playersIngame.length === 1) {
        playersIngame[0].state = PlayerStateEnum.Winner;
        this.state = SessionStateEnum.Finished;
      }
    }
  }
}
