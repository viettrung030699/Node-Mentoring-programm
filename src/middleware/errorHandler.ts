import { winstonLogger } from './Logger';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const errorHandler = (
  err: ErrorRequestHandler,
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

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
