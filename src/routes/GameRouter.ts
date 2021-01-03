import express, { Request, Response } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800, checkperiod: 60 });
const router = express.Router();
const cards: number[] = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 33, 44, 55, 66, 76, -10];
let count = 0;
let player1cards: number[] = [];
let player2cards: number[] = [];

router.get("/count", (request: Request, response: Response) => {
    response.status(200).send(`Die Lowbob Zahl ist: ${count}`);
});

router.get("/cards/:playerid", (request: Request, response: Response) => {
    if (request.params.playerid === "1") {
        response.status(200).send(`Deine Karten sind: ${player1cards.toString()}`);
    } else {
        response.status(200).send(`Deine Karten sind: ${player2cards.toString()}`);
    }
});

router.get("/draw/:playerid", (request: Request, response: Response) => {
    const newCard = cards[Math.floor(Math.random() * cards.length)];
    if (request.params.playerid === "1") {
        player1cards.push(newCard);
    } else {
        player2cards.push(newCard);
    }
    response.status(200).send(`Deine neue Karte ist: ${newCard}`);
});

router.post("/play/:playerid", (request: Request, response: Response) => {
    if (request.params.playerid === "1") {
        if (player1cards.includes(request.body.card)) {
            delete player1cards[player1cards.indexOf(request.body.card)];
        } else {
            response.status(404).send(`Du hast diese Karte nicht. Deine Karten sind: ${player1cards.toString()}`);
            return;
        }
    } else {
        if (player2cards.includes(request.body.card)) {
            delete player2cards[player2cards.indexOf(request.body.card)];
        } else {
            response.status(404).send(`Du hast diese Karte nicht. Deine Karten sind: ${player2cards.toString()}`);
        }
    }
    count += request.body.card;
    response.status(200).send(`Die Lowbob Zahl ist: ${count}`);
});

router.get("/reset", (request: Request, response: Response) => {
    count = 0;
    
    player1cards = [cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)]];
    player2cards = [cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)]];
    response.status(200).send(`Das Spiel wurde zurückgesetzt`);
});

export = router;