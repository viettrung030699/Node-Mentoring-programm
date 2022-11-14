const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      idle: dbConfig.pool.idle,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: unknown) => {
    if (error instanceof SyntaxError) {
      console.error('Unable to connect to the database: ', error);
    }
  });
