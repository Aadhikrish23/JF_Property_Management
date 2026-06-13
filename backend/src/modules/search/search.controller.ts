import { Request, Response, NextFunction } from 'express';
import { SearchService } from './search.service';

export class SearchController {
  private searchService = new SearchService();

  executeGlobalSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: execute global search
      res.status(200).json({ success: true, message: 'executeGlobalSearch placeholder' });
    } catch (error) {
      next(error);
    }
  };
}
