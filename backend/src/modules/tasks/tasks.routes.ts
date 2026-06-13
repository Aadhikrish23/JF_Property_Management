import { Router } from 'express';
import { TasksController } from './tasks.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { taskSchemas } from '../../validators';

const router = Router();
const controller = new TasksController();

// GET /api/v1/tasks
router.get('/', controller.listTasks);

// PATCH /api/v1/tasks/:id
router.patch('/:id', validateRequest(taskSchemas.updateStatus), controller.updateTaskStatus);

export default router;
