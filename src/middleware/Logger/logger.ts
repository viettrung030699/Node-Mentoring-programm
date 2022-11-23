import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './winstonLogger';

export const logger = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const log = `${req.method} ${req.url} Params: ${JSON.stringify(req.params)} Body: ${JSON.stringify(req.body)}`;

  winstonLogger.info(log);
  next();
};
