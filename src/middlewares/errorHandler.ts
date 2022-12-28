import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { winstonLogger } from '../config/winstonLogger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('error', err);
  if (res.headersSent) {
    return next(err);
  }

  winstonLogger.error(err.name, {
    path: req.path,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  res.status(StatusCodes.BAD_REQUEST).json({
    status: err.status || StatusCodes.BAD_REQUEST,
    message: err.message,
  });
};
