const winston = require('winston');

const transports = {
  console: new winston.transports.Console({
    level: 'warn',
    handleExceptions: true,

    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.label({ label: 'Winston Error Handler...' }),
      winston.format.timestamp(),
      winston.format.prettyPrint(),
    ),
  }),
  file: new winston.transports.File({
    filename: 'errors.log',
    level: 'error',
  }),
};

export const winstonLogger = winston.createLogger({
  level: 'info',
  transports: [transports.console, transports.file],
  exitOnError: false,
});

