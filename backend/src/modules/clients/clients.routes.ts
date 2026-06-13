import { Router } from 'express';
import { ClientsController } from './clients.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { clientSchemas } from '../../validators';

const router = Router();
const controller = new ClientsController();

// GET /api/v1/clients
router.get('/', controller.listClients);

// GET /api/v1/clients/:id
router.get('/:id', controller.getClientDetails);

// POST /api/v1/clients
router.post('/', validateRequest(clientSchemas.create), controller.createClient);

export default router;
