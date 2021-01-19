import express, { Request, Response } from "express";
import { ISession } from "../models/ISession";
import { Session } from "../classes/Session";
import { IPlayer } from "../models/IPlayer";
import { Errors } from "../models/Errors";

const router = express.Router();
const sessions: Session[] = [];

// Create a new session
router.post("/session", (request: Request, response: Response) => {
  const session = request.body as ISession;
  const newSession = new Session(session.name, session.chips, session.maxPlayers);
  sessions.push(newSession);
  response.status(201).json(newSession);
});

// Get game info
router.get("/session/:sessionId/player/:playerId", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  if (!session) {
    response.status(404).send(`Session with the id ${request.params.sessionId} could not be found`);
    return;
  }
  const player = session?.players.find((player) => player.id === request.params.playerId);
  if (!player) {
    response.status(404).send(`Player with the id ${request.params.playerId} could not be found`);
    return;
  }
  response.status(200).json(session.getStrippedSession(player.id));
});

// Delete a session
router.delete("/session/:sessionId", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  if (!session) {
    response.status(404).send(`Session with the id ${request.params.sessionId} could not be found`);
    return;
  }
  sessions.splice(sessions.indexOf(session), 1);
  response.status(200).send("Your session was deleted.");
});

// Create a new player
router.post("/session/:sessionId/player", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  if (!session) {
    response.status(404).send(`Session with the id ${request.params.sessionId} could not be found`);
    return;
  }
  try {
    const playerRequest = request.body as IPlayer;
    const player = session?.join(playerRequest.username, request.ip);
    response.status(201).json(player);
  } catch (error) {
    switch (error.message as Errors) {
      case Errors.ERR_MAX_PLAYERS:
        // TODO: HTTP ERROR IN YAML
        response.status(401).send(Errors.ERR_MAX_PLAYERS);
        break;
      case Errors.ERR_SAME_USERNAME:
        // TODO: HTTP ERROR IN YAML
        response.status(401).send(Errors.ERR_SAME_USERNAME);
        break;
      case Errors.ERR_USERNAME_TOO_SHORT:
        // TODO: HTTP ERROR IN YAML
        response.status(400).send(Errors.ERR_USERNAME_TOO_SHORT);
        break;
      default:
        console.log(error);
        response.status(500).send();
        break;
    }
  }
});

// Remove player from session
router.delete("/session/:sessionId/player/:playerId", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  if (!session) {
    response.status(404).send(`Session with the id ${request.params.sessionId} could not be found`);
    return;
  }
  const player = session?.players.find((player) => player.id === request.params.playerId);
  if (!player) {
    response.status(404).send(`Player with the id ${request.params.playerId} could not be found`);
    return;
  }
  session.players.splice(session.players.indexOf(player), 1);
  response.status(200).json(session.getStrippedSession(player.id));
});

// Draw a card
router.get("/session/:sessionId/player/:playerId/draw", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  if (!session) {
    response.status(404).send(`Session with the id ${request.params.sessionId} could not be found`);
    return;
  }
  const player = session?.players.find((player) => player.id === request.params.playerId);
  if (!player) {
    response.status(404).send(`Player with the id ${request.params.playerId} could not be found`);
    return;
  }
  if (!player.turn) {
    response.status(403).send(new Error(Errors.ERR_NOT_YOUR_TURN));
    return;
  }
  const drawedcard = session.cardset.draw();
  if (drawedcard) {
    player.cards.push(drawedcard);
  }
  response.status(200).json(session.getStrippedSession(player.id));
});

// Play a card
router.post("/session/:sessionId/player/:playerId/play/:cardid", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  if (!session) {
    response.status(404).send(`Session with the id ${request.params.sessionId} could not be found`);
    return;
  }
  const player = session?.players.find((player) => player.id === request.params.playerId);
  if (!player) {
    response.status(404).send(`Player with the id ${request.params.playerId} could not be found`);
    return;
  }
  if (!player.turn) {
    response.status(403).send(new Error(Errors.ERR_NOT_YOUR_TURN));
    return;
  }
  const card = player?.cards.find((card) => card.id === request.params.cardid);
  if (!card) {
    response.status(404).send(`Card with the id ${request.params.cardid} could not be found`);
    return;
  }
  if (session.turn !== session.players.indexOf(player)) {
    response.status(401).send(`It is not your turn to play.`);
    return;
  }
  session.playCard(session, player, card);
  response.status(200).json(session.getStrippedSession(player.id));
});

// End Turn
router.post("/session/:sessionId/player/:playerId/turn", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  if (!session) {
    response.status(404).send(`Session with the id ${request.params.sessionId} could not be found`);
    return;
  }
  const player = session?.players.find((player) => player.id === request.params.playerId);
  if (!player) {
    response.status(404).send(`Player with the id ${request.params.playerId} could not be found`);
    return;
  }
  if (!player.turn) {
    response.status(403).send(Errors.ERR_NOT_YOUR_TURN);
    return;
  }
  session.nextTurn();
  response.status(200).json(session.getStrippedSession(player.id));
});

// Reset a session
router.delete("/session/:sessionId/reset", (request: Request, response: Response) => {
  const session = sessions.find((session) => session.id === request.params.sessionId);
  session?.reset();
  response.status(200);
});

export = router;
