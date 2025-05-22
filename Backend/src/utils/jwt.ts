import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user: User): string => {
  return jwt.sign(
    { 
      id: user.id,
      username: user.username,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 