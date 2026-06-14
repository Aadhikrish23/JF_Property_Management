import { Request, Response, NextFunction } from 'express';
import { verify ,type JwtPayload } from '../utils/jwt.utils';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void  => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized: Missing token' });
    return
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verify(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
    return
  }
};
