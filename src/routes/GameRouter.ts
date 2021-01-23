import express, { Request, Response } from "express";
import { ISession } from "../models/ISession";
import { Session } from "../classes/Session";
import { IPlayer } from "../models/IPlayer";
import { Errors } from "../models/Errors";
import { SessionStateEnum } from "../models/SessionStateEnum";
import { PlayerStateEnum } from "../models/PlayerStateEnum";

const router = express.Router();
const sessions: Session[] = [];

// Create a new session
router.post("/session", (request: Request, response: Response) => {
  const session = request.body as ISession;
  const newSession = new Session(
    session.SETTING_NAME,
    session.SETTING_CHIPS,
    session.SETTING_MAX_PLAYERS
  );
  sessions.push(newSession);
  response.status(201).json(newSession);
});

// Get game info
router.get(
  "/session/:sessionId/player/:playerId",
  (request: Request, response: Response) => {
    const session = sessions.find(
      (session) => session.id === request.params.sessionId
    );
    if (!session) {
      response
        .status(404)
        .send(
          `Session with the id ${request.params.sessionId} could not be found`
        );
      return;
    }
    const player = session?.players.find(
      (player) => player.id === request.params.playerId
    );
    if (!player) {
      response
        .status(404)
        .send(
          `Player with the id ${request.params.playerId} could not be found`
        );
      return;
    }
    response.status(200).json(session.getStrippedSession(player.id));
  }
);

// Delete a session
router.delete("/session/:sessionId", (request: Request, response: Response) => {
  const session = sessions.find(
    (session) => session.id === request.params.sessionId
  );
  if (!session) {
    response
      .status(404)
      .send(
        `Session with the id ${request.params.sessionId} could not be found`
      );
    return;
  }
  sessions.splice(sessions.indexOf(session), 1);
  response.status(200).send("Your session was deleted.");
});

// Create a new player
router.post(
  "/session/:sessionId/player",
  async (request: Request, response: Response) => {
    const session = sessions.find(
      (session) => session.id === request.params.sessionId
    );
    if (!session) {
      response
        .status(404)
        .send(
          `Session with the id ${request.params.sessionId} could not be found`
        );
      return;
    }
    try {
      const playerRequest = request.body as IPlayer;
      const player = await session?.join(playerRequest.username, request.ip);
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
          response.status(500).send();
          break;
      }
    }
  }
);

// Remove player from session
router.delete(
  "/session/:sessionId/player/:playerId",
  (request: Request, response: Response) => {
    const session = sessions.find(
      (session) => session.id === request.params.sessionId
    );
    if (!session) {
      response
        .status(404)
        .send(
          `Session with the id ${request.params.sessionId} could not be found`
        );
      return;
    }
    const player = session?.players.find(
      (player) => player.id === request.params.playerId
    );
    if (!player) {
      response
        .status(404)
        .send(
          `Player with the id ${request.params.playerId} could not be found`
        );
      return;
    }
    session.players.splice(session.players.indexOf(player), 1);
    response.status(200).json(session.getStrippedSession(player.id));
  }
);

// Play a card
router.post(
  "/session/:sessionId/player/:playerId/play/:cardid",
  (request: Request, response: Response) => {
    let start = Date.now();
    const session = sessions.find(
      (session) => session.id === request.params.sessionId
    );
    if (!session) {
      response
        .status(404)
        .send(
          `Session with the id ${request.params.sessionId} could not be found`
        );
      return;
    }
    const player = session?.players.find(
      (player) => player.id === request.params.playerId
    );
    if (!player) {
      response
        .status(404)
        .send(
          `Player with the id ${request.params.playerId} could not be found`
        );
      return;
    }
    if (!player.turn) {
      response.status(403).send(new Error(Errors.ERR_NOT_YOUR_TURN));
      return;
    }
    const card = player?.cards.find(
      (card) => card.id === request.params.cardid
    );
    if (!card) {
      response
        .status(404)
        .send(`Card with the id ${request.params.cardid} could not be found`);
      return;
    }
    if (session.turn !== session.players.indexOf(player)) {
      response.status(401).send(`It is not your turn to play.`);
      return;
    }
    if (player.state === PlayerStateEnum.Loser) {
      response.status(403).send(Errors.ERR_LOST);
      return;
    }
    let end = Date.now();
    console.log(`Execution Checks: ${end - start} ms`);
    session.playCard(player, card);
    end = Date.now();
    console.log(`Execution Card Play: ${end - start} ms`);
    session.refillPlayerCards(player);
    end = Date.now();
    console.log(`Execution Refill: ${end - start} ms`);
    session.nextTurn();
    end = Date.now();
    console.log(`Execution Next Turn: ${end - start} ms`);
    response.status(200).json(session.getStrippedSession(player.id));
  }
);

// Reset a session
router.delete(
  "/session/:sessionId/reset",
  (request: Request, response: Response) => {
    const session = sessions.find(
      (session) => session.id === request.params.sessionId
    );
    if (session?.state !== SessionStateEnum.Finished) {
      response.status(403).send(Errors.ERR_SESSION_STILL_ONGOING);
      return;
    }
    session?.reset();
    response.status(200);
  }
);

export = router;
