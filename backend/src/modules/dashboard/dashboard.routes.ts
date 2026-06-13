import { Router } from 'express';

import { DashboardController } from './dashboard.controller';

const router = Router();
const controller = new DashboardController();

// GET /api/v1/dashboard
router.get('/', (req, res, next) => {
  void controller.getDashboardSummary(req, res, next);
});

export default router;

