import { Router } from 'express';
import { SearchController } from './search.controller';

const router = Router();
const controller = new SearchController();

// GET /api/v1/search
router.get('/', controller.executeGlobalSearch);

export default router;
