import { Router, Request, Response, NextFunction } from 'express';
import { SearchController } from './search.controller';
import { searchSchemas } from '../../validators';
import { sendError } from '../../shared/utils/response';

const router = Router();
const controller = new SearchController();

const validateSearchQuery = (req: Request, res: Response, next: NextFunction): void => {
  const result = searchSchemas.global.safeParse(req.query);
  if (!result.success) {
    const issue = result.error.issues[0];
    const message = issue ? issue.message : 'Invalid query parameter';
    sendError(res, 'VALIDATION_ERROR', message, 400);
    return;
  }
  req.query = result.data as any;
  next();
};

// GET /api/v1/search
router.get('/', validateSearchQuery, (req, res, next) => {
  void controller.executeGlobalSearch(req, res, next);
});

export default router;
