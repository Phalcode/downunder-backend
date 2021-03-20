import { Logger } from "tslog";
import { Server, Socket } from "socket.io";
import { Session } from "../classes/Session";
import { ISession } from "../models/ISession";
import { IPlayer } from "../models/IPlayer";
import { Errors } from "../models/Errors";
import { SocketReceivers } from "../models/SocketReceivers";
import { SocketEmitters } from "../models/SocketEmitters";
import { Player } from "../classes/Player";
import { Card } from "../classes/Card";
import { PlayerStateEnum } from "../models/PlayerStateEnum";

const log = new Logger();
export default class SessionHandler {
    io: Server;
    sessions: Session[];

    constructor(io: Server) {
        this.io = io;
        this.sessions = [];
        this.io.of("/").adapter.on("create-room", (room: string) => {
            log.info(`Room ${room} was created`);
        });
        this.io.of("/").adapter.on("delete-room", (room: string) => {
            log.info(`Room ${room} was deleted`);
        });
        this.io.of("/").adapter.on("join-room", (room: string, id: string) => {
            log.info(`Client ${id} has joined room ${room}`);
        });
        this.io.of("/").adapter.on("leave-room", (room: string, id: string) => {
            log.info(`Client ${id} has left room ${room}`);
        });
        this.io.on("connection", (data: Socket) => this.websocketHandler(data));
    }

    websocketHandler(socket: Socket): void {
        log.info(
            `Client ${socket.id} connected from ${socket.handshake.address}`
        );

        socket.on(SocketReceivers.CREATE_SESSION, (session: ISession) => {
            const newSession = new Session(
                session.SETTING_NAME,
                session.SETTING_CHIPS,
                session.SETTING_MAX_PLAYERS
            );
            this.sessions.push(newSession);
            socket.emit(SocketEmitters.SESSION, newSession);
        });

        socket.on(
            SocketReceivers.JOIN_SESSION,
            async (sessionId: string, newPlayer: IPlayer) => {
                const session = this.findSessionById(sessionId, socket);
                if (!session) return;
                if (session.checkIfSessionBegan()) {
                    if (newPlayer.id) {
                        const existingPlayer = this.findPlayerById(
                            session,
                            newPlayer.id,
                            socket
                        );
                        socket.emit(SocketEmitters.PLAYER, existingPlayer);
                    }
                    this.broadcastSession(session);
                    return;
                }
                try {
                    const player = await session?.join(
                        newPlayer.username,
                        socket
                    );
                    socket.emit(SocketEmitters.PLAYER, player);
                    this.broadcastSession(session);
                } catch (error) {
                    switch (error.message as Errors) {
                        case Errors.ERR_MAX_PLAYERS:
                            socket.emit(
                                SocketEmitters.THROW_ERROR,
                                Errors.ERR_MAX_PLAYERS
                            );
                            break;
                        case Errors.ERR_SAME_USERNAME:
                            socket.emit(
                                SocketEmitters.THROW_ERROR,
                                Errors.ERR_SAME_USERNAME
                            );
                            break;
                        case Errors.ERR_USERNAME_TOO_SHORT:
                            socket.emit(
                                SocketEmitters.THROW_ERROR,
                                Errors.ERR_USERNAME_TOO_SHORT
                            );
                            break;
                        default:
                            socket.emit(
                                SocketEmitters.THROW_ERROR,
                                Errors.GENERIC
                            );
                            break;
                    }
                }
            }
        );

        socket.on(
            SocketReceivers.PLAY,
            (sessionId: string, playerId: string, cardId: string) => {
                const session = this.findSessionById(sessionId, socket);
                if (!session) return;
                if (!session.checkIfSessionBegan()) {
                    socket.emit(
                        SocketEmitters.THROW_ERROR,
                        Errors.ERR_SESSION_ALREADY_STARTED
                    );
                    return;
                }
                if (session.players.length < 2) {
                    socket.emit(SocketEmitters.THROW_ERROR, Errors.ERR_ALONE);
                    return;
                }
                const player = this.findPlayerById(session, playerId, socket);
                if (!player) return;
                if (!player.turn) {
                    socket.emit(
                        SocketEmitters.THROW_ERROR,
                        Errors.ERR_NOT_YOUR_TURN
                    );
                    return;
                }
                if (player.state === PlayerStateEnum.Loser) {
                    socket.emit(SocketEmitters.THROW_ERROR, Errors.ERR_LOST);
                    return;
                }
                const card = this.findCardById(player, cardId, socket);
                if (!card) return;
                session.playCard(player, card);
                session.refillPlayerCards(player);
                session.nextTurn();
                this.broadcastSession(session);
            }
        );

        socket.on(SocketReceivers.RESET_SESSION, async (sessionId: string) => {
            const session = this.findSessionById(sessionId, socket);
            if (!session) return;
            if (!session.checkIfSessionBegan()) {
                socket.emit(
                    SocketEmitters.THROW_ERROR,
                    Errors.ERR_SESSION_ALREADY_STARTED
                );
                return;
            }
            await session.reset();
            this.broadcastSession(session);
        });

        socket.on("disconnect", () => {
            //TODO: socket.broadcast.emit("leave", "");
            log.info(`Client ${socket.id} closed connection`);
        });

        socket.on("error", (error: Error) => {
            //TODO: socket.broadcast.emit("leave", "");
            log.error(
                `Client Socket Error: ${socket.id}, ${socket.handshake.address}`,
                error.message
            );
        });
    }

    broadcastSession(session: Session) {
        session.players.map((player: Player) => {
            player.socket.emit(
                SocketEmitters.SESSION,
                session.getStrippedSession(player.id)
            );
        });
    }

    findSessionById(sessionId: string, socket: Socket): Session | undefined {
        const session = this.sessions.find(
            (session) => session.id === sessionId
        );
        if (!session) {
            socket.emit(
                SocketEmitters.THROW_ERROR,
                Errors.ERR_SESSION_NOT_FOUND
            );
        }
        return session;
    }

    findPlayerById(
        session: Session,
        playerId: string,
        socket: Socket
    ): Player | undefined {
        const player = session.players.find((player) => player.id === playerId);
        if (!player) {
            socket.emit(
                SocketEmitters.THROW_ERROR,
                Errors.ERR_PLAYER_NOT_FOUND
            );
        }
        return player;
    }

    findCardById(
        player: Player,
        cardId: string,
        socket: Socket
    ): Card | undefined {
        const card = player.cards.find((card) => card.id === cardId);
        if (!card) {
            socket.emit(SocketEmitters.THROW_ERROR, Errors.ERR_CARD_NOT_FOUND);
        }
        return card;
    }
}
