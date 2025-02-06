import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("JPLEX", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection has been established successfully");
  } catch (error) {
    console.error("unable to connect to the database", error);
  }
};

module.exports = connectDB;
