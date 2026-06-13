import { Router } from 'express';
import { NotificationsController } from './notifications.controller';

const router = Router();
const controller = new NotificationsController();

// GET /api/v1/notifications
router.get('/', (req, res, next) => {
  void controller.listNotifications(req, res, next);
});

// PATCH /api/v1/notifications/:id/read
router.patch('/:id/read', (req, res, next) => {
  void controller.markAsRead(req, res, next);
});

export default router;
