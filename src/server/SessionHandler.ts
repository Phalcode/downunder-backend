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
    clients: Map<string, Socket> = new Map<string, Socket>();

    constructor(io: Server) {
        this.io = io;
        this.sessions = [];
        this.io.on("connection", (data: Socket) => this.websocketHandler(data));
    }

    websocketHandler(socket: Socket): void {
        let socketPlayer: Player;
        let socketSession: Session;
        this.clients.set(socket.id, socket);
        log.info(
            `Client ${socket.id} connected from ${socket.handshake.address}`
        );

        socket.on(SocketReceivers.CREATE_SESSION, (session: ISession) => {
            const newSession = new Session(
                session.SETTING_NAME,
                session.SETTING_CHIPS,
                session.SETTING_MAX_PLAYERS,
                session.SETTING_MAX_COUNT,
                (sessionToBroadcast: Session) => this.broadcastSession(sessionToBroadcast)
            );
            this.sessions.push(newSession);
            log.info(`Client ${socket.id} created session ${newSession.id}`);
            socket.emit(SocketEmitters.SESSION, newSession);
        });

        socket.on(
            SocketReceivers.JOIN_SESSION,
            async (sessionId: string, newPlayer: IPlayer) => {
                // Check if requested session exists
                const session = this.findSessionById(sessionId, socket);
                if (!session) return;

                // Check if requested session has already begun
                if (session.checkIfSessionBegan()) {
                    // Check if Join provides ID of an existing player -> Reconnect
                    if (newPlayer.id) {
                        // Check if there is a player with his ID
                        const existingPlayer = this.findPlayerById(
                            session,
                            newPlayer.id,
                            socket
                        );
                        // Kick that MF out for trying to steal Identity
                        if (!existingPlayer) return;
                        // Rebuild new Player with old one
                        socketPlayer = {
                            ...existingPlayer,
                        } as Player;
                        socketSession = session;
                        socket.emit(
                            SocketEmitters.PLAYER,
                            existingPlayer.getStrippedPlayer()
                        );
                        this.broadcastSession(session);
                        log.info(
                            `Client ${socket.id} rejoined session ${session.id}`
                        );
                        return;
                    }
                }

                // Session is available and Player is not connected
                try {
                    console.log(this.sessions);
                    // Try to create Player with this Username
                    socketPlayer = await session.join(
                        newPlayer.username,
                        socket.id
                    );
                    socketSession = session;
                    // Send new Player to Client
                    socket.emit(
                        SocketEmitters.PLAYER,
                        socketPlayer.getStrippedPlayer()
                    );
                    // Broadcast Clients that he has connected
                    log.info(
                        `Client ${socket.id} joined session ${session.id}`
                    );
                    this.broadcastSession(session);
                } catch (error) {
                    log.error(error);
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
                // Find Session the Player wants to play a card in
                const session = this.findSessionById(sessionId, socket);
                if (!session) return;
                // Check if Player is alone
                if (session.players.length < 2) {
                    socket.emit(SocketEmitters.THROW_ERROR, Errors.ERR_ALONE);
                    return;
                }
                // Find Player that wants to play the card
                const player = this.findPlayerById(session, playerId, socket);
                if (!player) return;
                // Check if it is the Players turn
                if (!player.turn) {
                    socket.emit(
                        SocketEmitters.THROW_ERROR,
                        Errors.ERR_NOT_YOUR_TURN
                    );
                    return;
                }
                // Check if the Player has already lost
                if (player.state === PlayerStateEnum.Loser) {
                    socket.emit(SocketEmitters.THROW_ERROR, Errors.ERR_LOST);
                    return;
                }
                // Find the card the player wants to play
                const card = this.findCardById(player, cardId, socket);
                if (!card) return;
                // Play the card, draw a new one and pass the turn
                session.playCard(player, card);
                session.refillPlayerCards(player);
                session.nextTurn();
                log.info(
                    `Client ${socket.id} played card ${card.id} in session ${session.id}`
                );
                this.broadcastSession(session);
            }
        );

        socket.on(
            SocketReceivers.GET_SESSION,
            async (sessionId: string, playerId: string) => {
                const session = this.findSessionById(sessionId, socket);
                if (!session) return;
                const player = this.findPlayerById(session, playerId, socket);
                if (!player) return;
                socket.emit(
                    SocketEmitters.SESSION,
                    session.getStrippedSession(playerId)
                );
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
            this.cleanPlayerAndSession(socketPlayer, socketSession);
            log.info(`Client ${socket.id} closed connection`);
        });

        socket.on("error", (error: Error) => {
            this.cleanPlayerAndSession(socketPlayer, socketSession);
            log.error(
                `Client Socket Error: ${socket.id}, ${socket.handshake.address}`,
                error.message
            );
        });
    }

    cleanPlayerAndSession(socketPlayer: Player, socketSession: Session): void {
        if (!socketSession || !socketPlayer) return;
        socketSession.leave(socketPlayer.id);
        if (socketSession.players.length === 0) {
            log.info(`Garbage collected Session ${socketSession.id}`);
            this.sessions = this.sessions.filter(
                (existingSession) => existingSession.id !== socketSession.id
            );
        } else {
            this.broadcastSession(socketSession);
        }
    }

    broadcastSession(session: Session) {
        session.players.map((player: Player) => {
            const socket = this.findSocketById(player.socketId);
            if (!socket) {
                session.players.splice(session.players.indexOf(player), 1);
                return;
            }
            socket.emit(
                SocketEmitters.SESSION,
                session.getStrippedSession(player.id)
            );
        });
    }

    findSocketById(socketId: string): Socket | undefined {
        return this.clients.get(socketId);
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
