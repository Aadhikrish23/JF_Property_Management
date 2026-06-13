import { Request, Response, NextFunction } from 'express';
import { TaskType, TaskStatus, TaskPriority } from '@prisma/client';
import { sendSuccess, sendError } from '../../shared/utils/response';
import { TasksService } from './tasks.service';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class TasksController {
  private tasksService = new TasksService();

  listTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

      // 3. Parse type filter
      let type: TaskType | undefined;
      if (req.query.type) {
        const typeQuery = (req.query.type as string).toUpperCase();
        if (Object.values(TaskType).includes(typeQuery as TaskType)) {
          type = typeQuery as TaskType;
        } else {
          sendError(res, 'VALIDATION_ERROR', `Type must be one of: ${Object.values(TaskType).join(', ')}`, 400);
          return;
        }
      }

      // 4. Parse status filter
      let status: TaskStatus | undefined;
      if (req.query.status) {
        const statusQuery = (req.query.status as string).toUpperCase();
        if (Object.values(TaskStatus).includes(statusQuery as TaskStatus)) {
          status = statusQuery as TaskStatus;
        } else {
          sendError(res, 'VALIDATION_ERROR', `Status must be one of: ${Object.values(TaskStatus).join(', ')}`, 400);
          return;
        }
      }

      // 5. Parse priority filter
      let priority: TaskPriority | undefined;
      if (req.query.priority) {
        const priorityQuery = (req.query.priority as string).toUpperCase();
        if (Object.values(TaskPriority).includes(priorityQuery as TaskPriority)) {
          priority = priorityQuery as TaskPriority;
        } else {
          sendError(res, 'VALIDATION_ERROR', `Priority must be one of: ${Object.values(TaskPriority).join(', ')}`, 400);
          return;
        }
      }

      const data = await this.tasksService.list({ page, limit, type, status, priority });
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  updateTaskStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id || !UUID_REGEX.test(id)) {
        sendError(res, 'TASK_NOT_FOUND', 'Task not found', 404);
        return;
      }

      const { status } = req.body as { status: TaskStatus };

      // Task existence validation must be performed through the service layer
      const task = await this.tasksService.getById(id);
      if (!task) {
        sendError(res, 'TASK_NOT_FOUND', 'Task not found', 404);
        return;
      }

      const updatedTask = await this.tasksService.updateStatus(id, status);
      sendSuccess(res, {
        id: updatedTask.id,
        status: updatedTask.status,
      });
    } catch (error) {
      next(error);
    }
  };
}
