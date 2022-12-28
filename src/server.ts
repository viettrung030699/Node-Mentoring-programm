import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';

import { sequelize } from './connection/dbConnector';
import { groupRouter, userRouter } from './routes';
import { errorHandler, logger, winstonLogger } from './middlewares';
import { publicRouter } from './routes/public.router';
import { authorize } from './middlewares/auth';

export const app: Express = express();
const cors = require('cors');

// try {

// } catch (error: any) {
//   if (error instanceof SyntaxError) {
//     console.log(`Error occurred: ${error.message}`);
//   }
// }
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.all('*', authorize);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1', publicRouter);
app.use(logger, errorHandler);

process.on('unhandledRejection', (e, origin) => {
  winstonLogger.error('Winston Unhandled Rejection Logger...', e, origin);
});

process.on('uncaughtException', (e, origin) => {
  winstonLogger.error('Winston Uncaught Exception Logger...', e, origin);
});


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
