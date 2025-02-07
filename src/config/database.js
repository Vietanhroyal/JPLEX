import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configFile from "./config.js";
dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database || undefined,
  config.username || undefined,
  config.passsword || undefined,
  {
    dialect: config.dialect, // cái này là loại databae
    storage: config.storage, // cái này là uri của database
    host: config.host,
    logging: config.logging,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to DB successfully! (env: ${env} )`);
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
};

export default sequelize;
