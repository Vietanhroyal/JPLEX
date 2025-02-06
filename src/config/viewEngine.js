import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views"); // nếu có cái này thì mặc định controller nó mặc định chỏ đến folder views
};

module.exports = configViewEngine;
