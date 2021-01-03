import express, { Request, Response } from 'express';
import { ISession } from '../models/ISession';
import { Session } from '../classes/Session';

const router = express.Router();
const sessions: Session[] = [];

// Create a new session
router.post("/session", (request: Request, response: Response) => {
    const session = request.body as ISession;
    const newSession = new Session(session.chips, session.maxPlayers, session.hidden);
    sessions.push(newSession);
});

// Delete a session
router.delete("/session/:sessionid", (request: Request, response: Response) => {
});

// Get game info
router.get("/session/:sessionid/", (request: Request, response: Response) => {
});

// Get player info
router.get("/session/:sessionid/player/:playerid", (request: Request, response: Response) => {
});

// Play a card
router.post("/session/:sessionid/player/:playerid/play/:cardid", (request: Request, response: Response) => {
});

// Draw a card
router.get("/session/:sessionid/player/:playerid/draw", (request: Request, response: Response) => {
});

// End Turn
router.post("/session/:sessionid/player/:playerid/turn", (request: Request, response: Response) => {
});

// Remove player from session
router.delete("/session/:sessionid/player/:playerid", (request: Request, response: Response) => {
});

// Reset a session
router.delete("/session/:sessionid/reset", (request: Request, response: Response) => {
});

export = router;