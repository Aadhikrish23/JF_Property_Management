import { Router } from 'express';
import { NotificationsController } from './notifications.controller';

const router = Router();
const controller = new NotificationsController();

// GET /api/v1/notifications
router.get('/', controller.listNotifications);

// PATCH /api/v1/notifications/:id/read
router.patch('/:id/read', controller.markAsRead);

export default router;
