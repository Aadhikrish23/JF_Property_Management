import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../shared/utils/response';
import { SearchService } from './search.service';

export class SearchController {
  private searchService = new SearchService();

  executeGlobalSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const q = req.query.q as string;
      const data = await this.searchService.execute(q);
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };
}
