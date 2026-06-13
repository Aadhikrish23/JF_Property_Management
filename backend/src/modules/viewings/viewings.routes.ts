import { Router, Request, Response, NextFunction } from 'express';

import { sendError } from '../../shared/utils/response';
import { viewingSchemas } from '../../validators';
import { ViewingsController } from './viewings.controller';

const router = Router();
const controller = new ViewingsController();

const validateViewingCreate = (req: Request, res: Response, next: NextFunction): void => {
  const result = viewingSchemas.create.safeParse(req.body);
  if (!result.success) {
    const issue = result.error.issues[0];
    const message = issue ? issue.message : 'Invalid request body';
    sendError(res, 'VALIDATION_ERROR', message, 400);
    return;
  }
  req.body = result.data;
  next();
};

// GET /api/v1/viewings
router.get('/', (req, res, next) => {
  void controller.listViewings(req, res, next);
});

// POST /api/v1/viewings
router.post('/', validateViewingCreate, (req, res, next) => {
  void controller.createViewing(req, res, next);
});

export default router;

