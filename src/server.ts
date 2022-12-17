import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';

import { sequelize } from './connection/dbConnector';
import { groupRouter, userRouter } from './routes';
import { errorHandler, logger, winstonLogger } from './middlewares';
import { publicRouter } from './routes/public.router';

dotenv.config();

const app: Express = express();
const PORT = process.env.port;

try {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: any) => {
    if (error instanceof SyntaxError) {
      console.error('Unable to connect to the database: ', error);
    }
  });

  app.use('/users', userRouter);
  app.use('/groups', groupRouter);
  app.use('/', publicRouter);
  app.use(logger, errorHandler);
  
  process.on('unhandledRejection', (e, origin) => {
    winstonLogger.error('Winston Unhandled Rejection Logger...', e, origin);
  });

  process.on('uncaughtException', (e, origin) => {
    winstonLogger.error('Winston Uncaught Exception Logger...', e, origin);
  });

  sequelize.sync();

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });


  app.listen(PORT, () => {
    console.log(`⚡️ [Server]: Server is running at https://localhost:${PORT}`);
  });
} catch (error: any) {
  if (error instanceof SyntaxError) {
    console.log(`Error occurred: ${error.message}`);
  }
}
