import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Placeholder: Execute request schema verification
    // On success: call next()
    // On failure: call sendError() / return 400
    next();
  };
};
