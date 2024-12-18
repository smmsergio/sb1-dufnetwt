import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

// Cargar variables de entorno
dotenv.config({
  path: './.env',
  override: true
});

// Validar configuración requerida
const requiredEnvVars = ['OPENAI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',
    temperature: 0.1,
    maxTokens: 5
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};