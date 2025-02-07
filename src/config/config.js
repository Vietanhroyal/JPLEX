require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'), 
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'production_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
};
