import { Router } from 'express';
import { ViewingsController } from './viewings.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { viewingSchemas } from '../../validators';

const router = Router();
const controller = new ViewingsController();

// GET /api/v1/viewings
router.get('/', controller.listViewings);

// POST /api/v1/viewings
router.post('/', validateRequest(viewingSchemas.create), controller.createViewing);

export default router;
