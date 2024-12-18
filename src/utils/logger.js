import winston from 'winston';
import { config } from '../config/config.js';

export const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error'
    }),
    new winston.transports.File({ 
      filename: 'combined.log' 
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      level: config.logging.level
    })
  ]
});