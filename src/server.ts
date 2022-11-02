import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { router } from './routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.port;

try {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/users', router);

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  app.listen(PORT, () => {
    console.log(`⚡️ [Server]: Server is running at https://localhost:${PORT}`);
  });
  
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log(`Error occurred: ${error.message}`);
  }
}
