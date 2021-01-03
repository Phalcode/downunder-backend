"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Session_1 = require("../classes/Session");
const router = express_1.default.Router();
const sessions = [];
// Create a new session
router.post("/session", (request, response) => {
    const session = request.body;
    const newSession = new Session_1.Session(session.chips, session.maxPlayers, session.hidden);
    sessions.push(newSession);
    response.status(201).send();
});
// Delete a session
router.delete("/session/:sessionid", (request, response) => {
});
// Get game info
router.get("/session/:sessionid/", (request, response) => {
});
// Get player info
router.get("/session/:sessionid/player/:playerid", (request, response) => {
});
// Play a card
router.post("/session/:sessionid/player/:playerid/play/:cardid", (request, response) => {
});
// Draw a card
router.get("/session/:sessionid/player/:playerid/draw", (request, response) => {
});
// End Turn
router.post("/session/:sessionid/player/:playerid/turn", (request, response) => {
});
// Remove player from session
router.delete("/session/:sessionid/player/:playerid", (request, response) => {
});
// Reset a session
router.delete("/session/:sessionid/reset", (request, response) => {
});
module.exports = router;
