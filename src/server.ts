import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';

import { groupRouter, userRouter } from './routes';
import { sequelize, errorHandler } from './middleware';
import { winstonLogger, logger } from './middleware/Logger';

dotenv.config();

const app: Express = express();
const PORT = process.env.port;

try {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(logger);
  app.use('/users', userRouter);
  app.use('/groups', groupRouter);

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  app.use(errorHandler);

  process.on('unhandledRejection', (e, origin) => {
    winstonLogger.error('Winston Unhandled Rejection Logger...', e, origin);
  });

  process.on('uncaughtException', (e, origin) => {
    winstonLogger.error('Winston Uncaught Exception Logger...', e, origin);
  });

  sequelize.sync();

  app.listen(PORT, () => {
    console.log(`⚡️ [Server]: Server is running at https://localhost:${PORT}`);
  });
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log(`Error occurred: ${error.message}`);
  }
}
