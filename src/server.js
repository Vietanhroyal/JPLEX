import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
const methodOverride = require("method-override");

import initWebRoutes from "./route/web";
// cái này thì ok còn thằng dưới éo dc
import initStudentRoutes from "./route/studentRoute";
// đù má sao nó éo bắt vào cái đường dẫn đấy nhỉ
import { connectDB } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

let app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
initStudentRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("listen on port: " + port);
});
