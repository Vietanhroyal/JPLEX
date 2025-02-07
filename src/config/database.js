// File: src/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import configFile from './config.js'; // <-- import config.js đã khai báo ở trên

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(
  config.database || undefined,
  config.username || undefined,
  config.password || undefined,
  {
    dialect: config.dialect,
    storage: config.storage,
    host: config.host,
    logging: config.logging,

  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to DB successfully! (env: ${env})`);
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
};

export default sequelize;
