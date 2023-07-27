import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dataBase } from "./db";
import { router } from "./routers";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors({ origin: process.env.CORS_URL }));
app.use(express.json({ limit: "50mb" }));

app.use(router);

app.listen(port, "0.0.0.0", async () => {
  try {
    await dataBase.initialize();
    console.log(`Connected successfully on port ${port}`);
  } catch (error) {
    console.error(`Error occured: ${error}`);
  }
});
