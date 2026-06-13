import { Router, Request, Response, NextFunction } from 'express';

import { sendError } from '../../shared/utils/response';
import { clientSchemas } from '../../validators';
import { ClientsController } from './clients.controller';

const router = Router();
const controller = new ClientsController();

const validateClientCreate = (req: Request, res: Response, next: NextFunction): void => {
  const result = clientSchemas.create.safeParse(req.body);
  if (!result.success) {
    const issue = result.error.issues[0];
    const message = issue ? issue.message : 'Invalid request body';
    sendError(res, 'VALIDATION_ERROR', message, 400);
    return;
  }
  req.body = result.data;
  next();
};

// GET /api/v1/clients
router.get('/', (req, res, next) => {
  void controller.listClients(req, res, next);
});

// GET /api/v1/clients/:id
router.get('/:id', (req, res, next) => {
  void controller.getClientDetails(req, res, next);
});

// POST /api/v1/clients
router.post('/', validateClientCreate, (req, res, next) => {
  void controller.createClient(req, res, next);
});

export default router;

