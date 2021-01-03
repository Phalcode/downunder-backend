"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 1800, checkperiod: 60 });
const router = express_1.default.Router();
const cards = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 33, 44, 55, 66, 76, -10];
let count = 0;
let player1cards = [];
let player2cards = [];
router.get("/count", (request, response) => {
    response.status(200).send(`Die Lowbob Zahl ist: ${count}`);
});
router.get("/cards/:playerid", (request, response) => {
    if (request.params.playerid === "1") {
        response.status(200).send(`Deine Karten sind: ${player1cards.toString()}`);
    }
    else {
        response.status(200).send(`Deine Karten sind: ${player2cards.toString()}`);
    }
});
router.get("/draw/:playerid", (request, response) => {
    const newCard = cards[Math.floor(Math.random() * cards.length)];
    if (request.params.playerid === "1") {
        player1cards.push(newCard);
    }
    else {
        player2cards.push(newCard);
    }
    response.status(200).send(`Deine neue Karte ist: ${newCard}`);
});
router.post("/play/:playerid", (request, response) => {
    if (request.params.playerid === "1") {
        if (player1cards.includes(request.body.card)) {
            delete player1cards[player1cards.indexOf(request.body.card)];
        }
        else {
            response.status(404).send(`Du hast diese Karte nicht. Deine Karten sind: ${player1cards.toString()}`);
            return;
        }
    }
    else {
        if (player2cards.includes(request.body.card)) {
            delete player2cards[player2cards.indexOf(request.body.card)];
        }
        else {
            response.status(404).send(`Du hast diese Karte nicht. Deine Karten sind: ${player2cards.toString()}`);
        }
    }
    count += request.body.card;
    response.status(200).send(`Die Lowbob Zahl ist: ${count}`);
});
router.get("/reset", (request, response) => {
    count = 0;
    player1cards = [cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)]];
    player2cards = [cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)]];
    response.status(200).send(`Das Spiel wurde zurückgesetzt`);
});
module.exports = router;
