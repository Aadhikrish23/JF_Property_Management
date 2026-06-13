import { Request, Response, NextFunction } from 'express';
import { ViewingStatus } from '@prisma/client';

import { sendSuccess, sendError } from '../../shared/utils/response';
import { ViewingsService, CreateViewingData } from './viewings.service';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class ViewingsController {
  private viewingsService = new ViewingsService();

  listViewings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

      // Parse status filter
      let status: ViewingStatus | undefined;
      if (req.query.status) {
        const statusQuery = (req.query.status as string).toUpperCase();
        if (Object.values(ViewingStatus).includes(statusQuery as ViewingStatus)) {
          status = statusQuery as ViewingStatus;
        } else {
          sendError(res, 'VALIDATION_ERROR', `Status must be one of: ${Object.values(ViewingStatus).join(', ')}`, 400);
          return;
        }
      }

      // Parse propertyId filter
      let propertyId: string | undefined;
      if (req.query.propertyId) {
        const val = String(req.query.propertyId);
        if (!UUID_REGEX.test(val)) {
          sendError(res, 'VALIDATION_ERROR', 'propertyId must be a valid UUID', 400);
          return;
        }
        propertyId = val;
      }

      // Parse clientId filter
      let clientId: string | undefined;
      if (req.query.clientId) {
        const val = String(req.query.clientId);
        if (!UUID_REGEX.test(val)) {
          sendError(res, 'VALIDATION_ERROR', 'clientId must be a valid UUID', 400);
          return;
        }
        clientId = val;
      }

      const data = await this.viewingsService.list({ page, limit, status, propertyId, clientId });
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  createViewing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body as CreateViewingData;

      // Verify property exists
      const propertyExists = await this.viewingsService.propertyExists(body.propertyId);
      if (!propertyExists) {
        sendError(res, 'INVALID_PROPERTY', 'Property does not exist', 422);
        return;
      }

      // Verify client exists
      const clientExists = await this.viewingsService.clientExists(body.clientId);
      if (!clientExists) {
        sendError(res, 'INVALID_CLIENT', 'Client does not exist', 422);
        return;
      }

      const viewing = await this.viewingsService.create(body);
      sendSuccess(res, { id: viewing.id }, 201);
    } catch (error) {
      next(error);
    }
  };
}

