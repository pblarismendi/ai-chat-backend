import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config';

// Extender la interfaz de Request para incluir el id del usuario
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No se proporcionó token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret) as { id: number };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido o expirado' });
  }
}; 