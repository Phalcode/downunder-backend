import express, { Request, Response } from 'express';
import { ISession } from '../models/ISession';
import { Session } from '../classes/Session';

const router = express.Router();
const sessions: Session[] = [];

// Create a new session
router.post("/session", (request: Request, response: Response) => {
    const session = request.body as ISession;
    const newSession = new Session(session.name, session.chips, session.maxPlayers, session.hidden);
    sessions.push(newSession);
    response.status(201).send();
});

// Reset a session
router.delete("/session/:sessionid/reset", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
});

// Delete a session
router.delete("/session/:sessionid", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send();
        return;
    }
    sessions.splice(sessions.indexOf(session), 1);
    response.status(200).send();
});

// Get game info
router.get("/session/:sessionid/", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
});

// Get player info
router.get("/session/:sessionid/player/:playerid", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    const player = session?.players.find(player => player.id === request.params.playerid);
});

// Play a card
router.post("/session/:sessionid/player/:playerid/play/:cardid", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    const player = session?.players.find(player => player.id === request.params.playerid);
    const card = player?.cards.find(card => card.id === request.params.cardid);
});

// Draw a card
router.get("/session/:sessionid/player/:playerid/draw", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    const player = session?.players.find(player => player.id === request.params.playerid);
});

// End Turn
router.post("/session/:sessionid/player/:playerid/turn", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    const player = session?.players.find(player => player.id === request.params.playerid);
});

// Remove player from session
router.delete("/session/:sessionid/player/:playerid", (request: Request, response: Response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    const player = session?.players.find(player => player.id === request.params.playerid);
});

export = router;