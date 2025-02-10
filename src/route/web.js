import express from "express"; //bọn es5 thì nó hay dùng require
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/vietanhdz", homeController.getHomePage);
  // router.get("/", homeController.getcrud);

  return app.use("/", router); // dùng để gắn các route đã được định nghĩa vào app express
};

export default initWebRoutes; //cái này es6 nó export 1 thằng ra thôi
