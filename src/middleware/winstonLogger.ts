const winston = require('winston');

export const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'warn',
      handleExceptions: true,

      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.label({ label: 'Winston Error Handler...' }),
      ),
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: 'combine.log',
      format: winston.format.json(),
    }),
  ],
  exitOnError: false,
});
