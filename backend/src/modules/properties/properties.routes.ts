import { Router, Request, Response, NextFunction } from 'express';

import { sendError } from '../../shared/utils/response';
import { propertySchemas } from '../../validators';

import { PropertiesController } from './properties.controller';

const router = Router();
const controller = new PropertiesController();

const validatePropertyCreate = (req: Request, res: Response, next: NextFunction): void => {
  const result = propertySchemas.create.safeParse(req.body);
  if (!result.success) {
    const issue = result.error.issues[0];
    const message = issue ? issue.message : 'Invalid request body';
    sendError(res, 'VALIDATION_ERROR', message, 400);
    return;
  }
  req.body = result.data;
  next();
};

// GET /api/v1/properties
router.get('/', (req, res, next) => {
  void controller.listProperties(req, res, next);
});

// GET /api/v1/properties/:id
router.get('/:id', (req, res, next) => {
  void controller.getPropertyDetails(req, res, next);
});

// POST /api/v1/properties
router.post('/', validatePropertyCreate, (req, res, next) => {
  void controller.createProperty(req, res, next);
});

export default router;

