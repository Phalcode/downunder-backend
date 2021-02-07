import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import GameRouter from "../routes/GameRouter";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { errorHandler, notFoundHandler } from "../routes/ErrorHandler";
dotenv.config();

const port = process.env.PORT || 80;
const app: express.Application = express();
const corsOptions: CorsOptions = {
  origin: /(https:\/\/downunder.platform.alfagun74.de|https:\/\/downunder-test.platform.alfagun74.de|http:\/\/localhost)/,
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", GameRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `7️⃣ 7️⃣  Downunder 77 Server ${
      require("../../package.json").version
    } started on Port ${port}`
  );
});
