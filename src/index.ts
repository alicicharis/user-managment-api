import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use((req: Request, res: Response) => {
  res.send({
    message: "Not found!",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
