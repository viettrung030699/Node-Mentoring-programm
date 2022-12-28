import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { ERROR_403_FORBIDDEN } from '../constants';

dotenv.config();
const jwt = require('jsonwebtoken');

export const encryptPassword = (password: string, SALT_ROUNDS = 10) => {
  return bcrypt.hashSync(password, SALT_ROUNDS).toString();
};

export const verifyPassword = (password: string, dbPassword: string) => {
  console.log({ dbPassword });
  return bcrypt.compareSync(password, dbPassword);
};

export const getSecretKey = (secretKey?: string) => {
  console.log({ secretKey });
  if (!secretKey) throw new Error(ERROR_403_FORBIDDEN);

  return secretKey;
};

export const verifyToken = (token: string) => {
  try {
    console.log({ token });
    jwt.verify(
      token,
      getSecretKey(process.env.JWT_SECRET_KEY),
      {
        algorithms: ['HS256'],
      },
      function (err: any, payload: any) {
        if(err) throw new Error('TokenExpiredError');
        console.log({ payload });
      },
    );
  } catch (error: any) {
    if (error instanceof Error) throw new Error(ERROR_403_FORBIDDEN);
  }
};

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, getSecretKey(process.env.JWT_SECRET_KEY));
};
