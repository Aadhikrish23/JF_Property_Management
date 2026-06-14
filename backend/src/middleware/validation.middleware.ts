import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction):void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
       res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      });
      return
    }
  };