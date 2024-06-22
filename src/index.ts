import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const bodyParser = require("body-parser");
const cors = require("cors");

import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

app.use((req: Request, res: Response) => {
  res.send({
    message: "Not found!",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
