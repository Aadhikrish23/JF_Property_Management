import { Request, Response, NextFunction } from 'express';

import { sendSuccess } from '../../shared/utils/response';

import { DashboardService } from './dashboard.service';

export class DashboardController {
  private dashboardService = new DashboardService();

  getDashboardSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.dashboardService.getSummary();
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };
}


