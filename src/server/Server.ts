import logger from "morgan";
import express from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import SessionHandler from "./SessionHandler";
import { Server } from "socket.io";
import { Logger } from "tslog";

const log = new Logger();
const port = process.env.PORT || 80;
const app: express.Application = express();
const corsOptions: CorsOptions = {
    origin: /(https:\/\/downunder.platform.alfagun74.de|https:\/\/downunder-test.platform.alfagun74.de|http:\/\/localhost)/,
    optionsSuccessStatus: 200,
};

let sessionHandler: SessionHandler;

app.use(helmet());
app.use(logger("short"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const server = app.listen({ port: +port, host: "0.0.0.0" }, () => {
    sessionHandler = new SessionHandler(
        new Server(server)
    );
    log.info(
        `DownUnder Server v${
            require("../../package.json").version
        } started on Port ${port}`
    );
});
