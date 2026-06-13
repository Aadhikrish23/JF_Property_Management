import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    const result = await authService.login(email, password);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ success: false, error: error.message });
    }
    next(error);
  }
};
