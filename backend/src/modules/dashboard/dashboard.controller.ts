import { Request, Response, NextFunction } from 'express';
import { DashboardService } from './dashboard.service';

export class DashboardController {
  private dashboardService = new DashboardService();

  getDashboardSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: Call dashboardService.getSummary() and return sendSuccess()
      res.status(200).json({ success: true, message: 'getDashboardSummary placeholder' });
    } catch (error) {
      next(error);
    }
  };
}
