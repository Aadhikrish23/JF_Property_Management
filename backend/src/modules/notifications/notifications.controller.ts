import { Request, Response, NextFunction } from 'express';
import { NotificationsService } from './notifications.service';

export class NotificationsController {
  private notificationsService = new NotificationsService();

  listNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: list notifications
      res.status(200).json({ success: true, message: 'listNotifications placeholder' });
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: mark notification as read
      res.status(200).json({ success: true, message: 'markAsRead placeholder' });
    } catch (error) {
      next(error);
    }
  };
}
