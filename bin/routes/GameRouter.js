"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Session_1 = require("../classes/Session");
const Errors_1 = require("../models/Errors");
const router = express_1.default.Router();
const sessions = [];
// Create a new session
router.post("/session", (request, response) => {
    const session = request.body;
    const newSession = new Session_1.Session(session.name, session.chips, session.maxPlayers);
    sessions.push(newSession);
    console.log(newSession);
    response.status(201).json(newSession);
});
// Get game info
router.get("/session/:sessionid/", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    if (!session) {
        response
            .status(404)
            .send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    response.status(200).json(session);
});
// Delete a session
router.delete("/session/:sessionid", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    if (!session) {
        response
            .status(404)
            .send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    sessions.splice(sessions.indexOf(session), 1);
    response.status(200).send("Your session was deleted.");
});
// Create a new player
router.post("/session/:sessionid/player", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    try {
        const playerRequest = request.body;
        const player = session?.join(playerRequest.username, request.ip);
        response.status(201).json(player);
    }
    catch (error) {
        switch (error) {
            case Errors_1.Errors.ERR_MAX_PLAYERS:
                // TODO: HTTP ERROR
                break;
            case Errors_1.Errors.ERR_SAME_USERNAME:
                // TODO: HTTP ERROR
                break;
            default:
                // TODO: HTTP ERROR 500
                break;
        }
    }
});
// Get player info
router.get("/session/:sessionid/player/:playerid", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    if (!session) {
        response
            .status(404)
            .send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find((player) => player.id === request.params.playerid);
    if (!player) {
        response
            .status(404)
            .send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
    response.status(200).json(player);
});
// Remove player from session
router.delete("/session/:sessionid/player/:playerid", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    if (!session) {
        response
            .status(404)
            .send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find((player) => player.id === request.params.playerid);
    if (!player) {
        response
            .status(404)
            .send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
    session.players.splice(session.players.indexOf(player), 1);
    response.status(200).send("The player was removed from the game.");
});
// Draw a card
router.get("/session/:sessionid/player/:playerid/draw", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    if (!session) {
        response
            .status(404)
            .send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find((player) => player.id === request.params.playerid);
    if (!player) {
        response
            .status(404)
            .send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
    const drawedcard = session.cardset.draw();
    if (drawedcard) {
        player.cards.push(drawedcard);
    }
    response.status(200).json(player);
});
// Play a card
router.post("/session/:sessionid/player/:playerid/play/:cardid", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    if (!session) {
        response
            .status(404)
            .send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find((player) => player.id === request.params.playerid);
    if (!player) {
        response
            .status(404)
            .send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
    const card = player?.cards.find((card) => card.id === request.params.cardid);
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
    session.playCard(session, player, card);
    response.status(200).json(session);
});
// End Turn
router.post("/session/:sessionid/player/:playerid/turn", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    if (!session) {
        response
            .status(404)
            .send(`Session with the id ${request.params.sessionid} could not be found`);
        return;
    }
    const player = session?.players.find((player) => player.id === request.params.playerid);
    if (!player) {
        response
            .status(404)
            .send(`Player with the id ${request.params.playerid} could not be found`);
        return;
    }
    session.nextTurn();
    response.status(200).send("Your turn is now over.");
});
// Reset a session
router.delete("/session/:sessionid/reset", (request, response) => {
    const session = sessions.find((session) => session.id === request.params.sessionid);
    session?.reset();
    response.status(200).json(session);
});
module.exports = router;
