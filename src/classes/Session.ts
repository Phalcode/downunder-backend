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
import { Logger } from "tslog";
import rfdc from "rfdc";

const log = new Logger();
export class Session implements ISession {
    readonly id = nanoid(5);
    state: SessionStateEnum = SessionStateEnum.Running;
    cardset: CardSet = new CardSet();
    players: Player[] = [];
    count: number = 0;
    turn: number = 0;
    doubleTurn: boolean = false;
    reverse: boolean = false;
    pasch: boolean = false;
    private doubleTurnActivator: number = -1;

    constructor(
        readonly SETTING_NAME: string,
        readonly SETTING_CHIPS = 3,
        readonly SETTING_MAX_PLAYERS = 8,
        readonly SETTING_MAX_COUNT = 77,
        private broadcastSession: (sessionToBroadcast: Session) => void
    ) {}

    async reset() {
        this.cardset = new CardSet();
        this.state = SessionStateEnum.Running;
        this.count = 0;
        this.turn = 0;
        this.doubleTurn = false;
        this.reverse = false;
        this.pasch = false;
        for (const player of this.players) {
            await player.getImageUrl();
            player.state = PlayerStateEnum.Ingame;
            player.chips = this.SETTING_CHIPS;
            player.turn = false;
            player.cards = this.cardset.drawMultiple(5);
        }
        for (let i = this.players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.players[i], this.players[j]] = [
                this.players[j],
                this.players[i],
            ];
        }
        this.players[0].turn = true;
        log.info("Resetted Session: " + this.id);
        this.broadcastSession(this);
    }

    async join(username: string, socketId: string) {
        if (username.length < 3) {
            throw new Error(Errors.ERR_USERNAME_TOO_SHORT);
        }

        if (this.players.length >= this.SETTING_MAX_PLAYERS) {
            throw new Error(Errors.ERR_MAX_PLAYERS);
        }

        if (
            this.players.find(
                (player) =>
                    player.username.toLowerCase() === username.toLowerCase()
            )
        ) {
            throw new Error(Errors.ERR_SAME_USERNAME);
        }

        const newPlayer = new Player(
            username,
            socketId,
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
        const leavingPlayer = this.players.find(
            (player) => (player.id = playerId)
        );
        if (leavingPlayer) {
            this.cardset.returnCards(leavingPlayer.cards);
            this.players.splice(this.players.indexOf(leavingPlayer), 1);
        }
    }

    nextTurn(skip: boolean = false) {
        if (this.players.length === 1) return;
        const wasDoubleTurn = this.doubleTurn;
        if (
            this.doubleTurn &&
            this.doubleTurnActivator !== this.turn &&
            !skip
        ) {
            this.doubleTurn = false;
            return;
        }
        if (!this.reverse) {
            this.turn < this.players.length - 1 ? this.turn++ : (this.turn = 0);
        } else {
            this.turn > 0 ? this.turn-- : (this.turn = this.players.length - 1);
        }
        this.players.map((player: IPlayer) => (player.turn = false));
        this.players[this.turn].turn = true;

        //SKIP LOSERS KEEP DOUBLE TURNS
        if (this.players[this.turn].state === PlayerStateEnum.Loser) {
            if (wasDoubleTurn) {
                this.doubleTurn = true;
            }
            this.nextTurn(true);
        }
    }

    playCard(player: Player, card: Card) {
        switch (card.type) {
            case CardTypeEnum.Normal: {
                this.playNormalCard(card);
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
        this.roundOver(player);
    }

    removePlayer(player: Player): void {
        this.cardset.returnCards(player.cards);
        this.players.splice(this.players.indexOf(player), 1);
    }

    getStrippedSession(playerId: string): ISession {
        const session: ISession = rfdc()<ISession>(this);
        session.players?.map((player: IPlayer) => {
            delete session?.cardset?.cards;
            delete player?.socket;
            if (player.id !== playerId) {
                delete player?.cards;
                delete player?.id;
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

    private playNormalCard(card: Card) {
        this.count += card?.value || 0;

        if (this.count === this.SETTING_MAX_COUNT) {
            return;
        }

        if (this.count % 11 === 0 && card?.value != 0) {
            this.pasch = true;
        }
    }

    private playChangeDirection() {
        this.reverse = !this.reverse;
    }

    private playDoubleTurn() {
        this.doubleTurn = true;
        this.doubleTurnActivator = this.turn;
    }

    private roundOver(player: Player) {
        if (this.count >= this.SETTING_MAX_COUNT || this.pasch) {
            player.chips--;

            // Remove player if necessary
            if (player.chips <= 0) {
                this.cardset.returnCards(player.cards);
                player.cards = [];
                player.state = PlayerStateEnum.Loser;
            }

            // Reset Round if necessary
            if (!this.pasch) {
                this.doubleTurn = false;
                this.count = 0;
                this.cardset = new CardSet();
                for (const player of this.players) {
                    if (player.state === PlayerStateEnum.Ingame) {
                        player.cards = this.cardset.drawMultiple(5);
                    }
                }
            }

            this.pasch = false;

            // Check Gameover
            const playersIngame = this.players.filter(
                (player: Player) => player.state === PlayerStateEnum.Ingame
            );
            if (playersIngame.length === 1) {
                playersIngame[0].state = PlayerStateEnum.Winner;
                this.state = SessionStateEnum.Finished;
                this.count = 0;
                for (let player of this.players) {
                    player.cards = [];
                }
                //RESTART SESSION IN 15 SEC
                setTimeout(() => this.reset(), 15000);
            }
        }
    }
}
