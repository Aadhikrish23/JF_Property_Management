import { Request, Response, NextFunction } from 'express';
import { ViewingsService } from './viewings.service';

export class ViewingsController {
  private viewingsService = new ViewingsService();

  listViewings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: list viewings
      res.status(200).json({ success: true, message: 'listViewings placeholder' });
    } catch (error) {
      next(error);
    }
  };

  createViewing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: create viewing
      res.status(201).json({ success: true, message: 'createViewing placeholder' });
    } catch (error) {
      next(error);
    }
  };
}
