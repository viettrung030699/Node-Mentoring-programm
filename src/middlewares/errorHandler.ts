import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { winstonLogger } from '../config/winstonLogger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  winstonLogger.error(err.name, {
    path: req.path,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  res.status(StatusCodes.INTERNAL_SERVER_ERROR || err.status).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR || err.status,
    message: err.message,
  });
};
