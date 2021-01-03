"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Session_1 = require("../classes/Session");
const router = express_1.default.Router();
const sessions = [];
// Get game info
router.get("/gzuz", (request, response) => {
    response.status(200).send("Wehe du benutzt Notepad zum entwickeln: https://code.visualstudio.com/download");
});
// Create a new session
router.post("/session", (request, response) => {
    const session = request.body;
    const newSession = new Session_1.Session(session.name, session.chips, session.maxPlayers, session.hidden);
    sessions.push(newSession);
    response.status(201).send(`Your session was created. The id is ${newSession.id}.`);
});
// Reset a session
router.delete("/session/:sessionid/reset", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    session?.reset();
    response.status(200).send(`Your session was reset.`);
});
// Delete a session
router.delete("/session/:sessionid", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    sessions.splice(sessions.indexOf(session), 1);
    response.status(200).send("Your session was deleted.");
});
// Get game info
router.get("/session/:sessionid/", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    response.status(200).json(session).send();
});
// Get player info
router.get("/session/:sessionid/player/:playerid", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find(player => player.id === request.params.playerid);
    if (!player) {
        response.status(404).send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
});
// Play a card
router.post("/session/:sessionid/player/:playerid/play/:cardid", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find(player => player.id === request.params.playerid);
    if (!player) {
        response.status(404).send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
    const card = player?.cards.find(card => card.id === request.params.cardid);
    if (!card) {
        response.status(404).send(`Card with the id ${request.params.cardid} could not be found`);
        return;
    }
});
// Draw a card
router.get("/session/:sessionid/player/:playerid/draw", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find(player => player.id === request.params.playerid);
    if (!player) {
        response.status(404).send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
});
// End Turn
router.post("/session/:sessionid/player/:playerid/turn", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find(player => player.id === request.params.playerid);
    if (!player) {
        response.status(404).send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
});
// Remove player from session
router.delete("/session/:sessionid/player/:playerid", (request, response) => {
    const session = sessions.find(session => session.id === request.params.sessionid);
    if (!session) {
        response.status(404).send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find(player => player.id === request.params.playerid);
    if (!player) {
        response.status(404).send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
});
module.exports = router;
