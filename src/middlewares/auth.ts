import { NextFunction, Request, Response } from 'express';

import { UserService } from '../services';
import { generateAccessToken, verifyToken } from '../utils/utils';
import { ERROR_400_MESSAGE, ERROR_400_USER_NOT_FOUND, ERROR_401_UNAUTHORIZATION } from '../constants';

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const headerToken = req.headers.authorization;

    if (!headerToken) return res.status(401).json({message: ERROR_401_UNAUTHORIZATION});

    const jwtToken = headerToken.split(' ')[1];
    verifyToken(jwtToken);
    next();
  } catch (error: any) {
    next(error);
  }
};

export const signToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { login, password } = req.body;
    const user = { login: login, password: password };

    if (!user) throw new Error(ERROR_400_MESSAGE);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (error: any) {}
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = req.body;
    const user = await UserService.authorization(login, password);
    if (!user) {
      throw new Error(ERROR_400_USER_NOT_FOUND);
    } else {
      req.body = user;
      res.status(200);
      next();
    }
  } catch (error) {
    next(error);
  }
};

