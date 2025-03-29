import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: process.env.JWT_SECRET || 'ai-chat-secret-key',
  jwtExpiration: parseInt(process.env.JWT_EXPIRATION || '86400', 10), // 24 horas en segundos
}; 