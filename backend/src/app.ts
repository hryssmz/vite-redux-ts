// app.ts
import path from "path";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";

import fakeRouter from "./routes/fake";

const app = express();

// Setup request body parser.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup cors.
app.use(cors());

// Setup helmet.
app.use(helmet());

// Setup static assets.
app.use(express.static(path.join(__dirname, "..", "public")));

// Setup logger.
app.use(logger("dev"));

// Setup routers.
app.use("/fakeApi", fakeRouter);

// Setup error handler.
app.use((req, res) => {
  return res.json({ detail: "Not Found" });
});

export default app;
