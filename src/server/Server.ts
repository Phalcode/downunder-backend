import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import GameRouter from "../routes/GameRouter";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 7777;
const app: express.Application = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", GameRouter)

app.listen(port, () => {
    console.log(`7️⃣ 7️⃣  Lowbob 77 Server started on Port ${port}`);
});