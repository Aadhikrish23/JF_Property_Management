import { Router, Request, Response, NextFunction } from 'express';
import { TasksController } from './tasks.controller';
import { taskSchemas } from '../../validators';
import { sendError } from '../../shared/utils/response';

const router = Router();
const controller = new TasksController();

const validateTaskUpdateStatus = (req: Request, res: Response, next: NextFunction): void => {
  const result = taskSchemas.updateStatus.safeParse(req.body);
  if (!result.success) {
    const issue = result.error.issues[0];
    const message = issue ? issue.message : 'Invalid request body';
    sendError(res, 'VALIDATION_ERROR', message, 400);
    return;
  }
  req.body = result.data;
  next();
};

// GET /api/v1/tasks
router.get('/', (req, res, next) => {
  void controller.listTasks(req, res, next);
});

// PATCH /api/v1/tasks/:id
router.patch('/:id', validateTaskUpdateStatus, (req, res, next) => {
  void controller.updateTaskStatus(req, res, next);
});

export default router;
