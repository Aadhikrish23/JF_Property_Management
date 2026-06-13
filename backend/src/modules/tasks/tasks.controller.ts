import { Request, Response, NextFunction } from 'express';
import { TasksService } from './tasks.service';

export class TasksController {
  private tasksService = new TasksService();

  listTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: list tasks
      res.status(200).json({ success: true, message: 'listTasks placeholder' });
    } catch (error) {
      next(error);
    }
  };

  updateTaskStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: update task status
      res.status(200).json({ success: true, message: 'updateTaskStatus placeholder' });
    } catch (error) {
      next(error);
    }
  };
}
