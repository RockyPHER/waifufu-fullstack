import express from "express";
import router from "./router";
import cors from "cors";

const app = express();
const port: number = 3000;
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(router);

app.listen(port, () => {
  console.log("App listening on port " + port);
});
