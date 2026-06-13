import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../../shared/utils/response';
import { NotificationsService } from './notifications.service';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class NotificationsController {
  private notificationsService = new NotificationsService();

  listNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Parse pagination page
      let page = 1;
      if (req.query.page) {
        const parsedPage = parseInt(req.query.page as string, 10);
        if (!isNaN(parsedPage) && parsedPage >= 1) {
          page = parsedPage;
        } else {
          sendError(res, 'VALIDATION_ERROR', 'Page number must be a positive integer', 400);
          return;
        }
      }

      // 2. Parse pagination limit
      let limit = 20;
      if (req.query.limit) {
        const parsedLimit = parseInt(req.query.limit as string, 10);
        if (!isNaN(parsedLimit) && parsedLimit >= 1 && parsedLimit <= 100) {
          limit = parsedLimit;
        } else {
          sendError(res, 'VALIDATION_ERROR', 'Limit must be an integer between 1 and 100', 400);
          return;
        }
      }

      // 3. Parse isRead filter
      let isRead: boolean | undefined;
      if (req.query.isRead !== undefined) {
        const val = String(req.query.isRead).toLowerCase();
        if (val === 'true') {
          isRead = true;
        } else if (val === 'false') {
          isRead = false;
        } else {
          sendError(res, 'VALIDATION_ERROR', 'isRead must be true or false', 400);
          return;
        }
      }

      const data = await this.notificationsService.list({ page, limit, isRead });
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id || !UUID_REGEX.test(id)) {
        sendError(res, 'NOTIFICATION_NOT_FOUND', 'Notification not found', 404);
        return;
      }

      // Notification existence validation must be performed through the service layer
      const notification = await this.notificationsService.getById(id);
      if (!notification) {
        sendError(res, 'NOTIFICATION_NOT_FOUND', 'Notification not found', 404);
        return;
      }

      const updated = await this.notificationsService.markAsRead(id);
      sendSuccess(res, {
        id: updated.id,
        isRead: updated.isRead,
      });
    } catch (error) {
      next(error);
    }
  };
}
