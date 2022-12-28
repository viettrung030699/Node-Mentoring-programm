import dotenv from 'dotenv';
import { sequelize } from './connection/dbConnector';

import { app } from './server';

dotenv.config();

const PORT = process.env.port;
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

sequelize.sync();

app.listen(PORT, () => {
  console.log(`⚡️ [Server]: Server is running at https://localhost:${PORT}`);
});
