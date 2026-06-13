import { Request, Response, NextFunction } from 'express';

import { sendSuccess, sendError } from '../../shared/utils/response';
import { ClientsService } from './clients.service';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class ClientsController {
  private clientsService = new ClientsService();

  listClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Parse page
      let page = 1;
      if (req.query.page) {
        const parsed = parseInt(req.query.page as string, 10);
        if (!isNaN(parsed) && parsed >= 1) {
          page = parsed;
        } else {
          sendError(res, 'VALIDATION_ERROR', 'Page number must be a positive integer', 400);
          return;
        }
      }

      // Parse limit
      let limit = 20;
      if (req.query.limit) {
        const parsed = parseInt(req.query.limit as string, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 100) {
          limit = parsed;
        } else {
          sendError(res, 'VALIDATION_ERROR', 'Limit must be an integer between 1 and 100', 400);
          return;
        }
      }

      const search = req.query.search ? String(req.query.search) : undefined;

      const data = await this.clientsService.list({ page, limit, search });
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  getClientDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id || !UUID_REGEX.test(id)) {
        sendError(res, 'CLIENT_NOT_FOUND', 'Client not found', 404);
        return;
      }

      const client = await this.clientsService.getById(id);
      if (!client) {
        sendError(res, 'CLIENT_NOT_FOUND', 'Client not found', 404);
        return;
      }

      sendSuccess(res, client);
    } catch (error) {
      next(error);
    }
  };

  createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, phone } = req.body as { name: string; email?: string; phone?: string };
      const client = await this.clientsService.create({ name, email, phone });
      sendSuccess(res, { id: client.id }, 201);
    } catch (error) {
      next(error);
    }
  };
}
