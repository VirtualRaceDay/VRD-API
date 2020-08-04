import winston from 'winston';

const silent = process.env.NODE_ENV === 'test';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ silent }),
  ]
});

export default logger;
