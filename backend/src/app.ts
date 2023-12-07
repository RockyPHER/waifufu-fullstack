import express from "express";
import router from "./router";

const app = express();
const port : number = 3000;
app.use(express.json())
app.use(router);


app.listen(port, () => {
    console.log("App listening on port " + port);
})