import { Router } from 'express';
import { PropertiesController } from './properties.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { propertySchemas } from '../../validators';

const router = Router();
const controller = new PropertiesController();

// GET /api/v1/properties
router.get('/', controller.listProperties);

// GET /api/v1/properties/:id
router.get('/:id', controller.getPropertyDetails);

// POST /api/v1/properties
router.post('/', validateRequest(propertySchemas.create), controller.createProperty);

export default router;
