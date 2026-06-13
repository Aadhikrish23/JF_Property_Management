import { PropertyStatus } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

import { sendSuccess, sendError } from '../../shared/utils/response';

import { PropertiesService } from './properties.service';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class PropertiesController {
  private propertiesService = new PropertiesService();

  listProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Parse pagination page
      let page = 1;
      if (req.query.page) {
        const parsedPage = parseInt(req.query.page as string, 10);
        if (!isNaN(parsedPage) && parsedPage >= 1) {
          page = parsedPage;
        } else {
          sendError(res, 'VALIDATION_ERROR', 'Page number must be a positive integer', 400);
          return;
        }
      }

      // 2. Parse pagination limit
      let limit = 20;
      if (req.query.limit) {
        const parsedLimit = parseInt(req.query.limit as string, 10);
        if (!isNaN(parsedLimit) && parsedLimit >= 1 && parsedLimit <= 100) {
          limit = parsedLimit;
        } else {
          sendError(res, 'VALIDATION_ERROR', 'Limit must be an integer between 1 and 100', 400);
          return;
        }
      }

      // 3. Parse status filter
      let status: PropertyStatus | undefined;
      if (req.query.status) {
        const statusQuery = (req.query.status as string).toUpperCase();
        if (Object.values(PropertyStatus).includes(statusQuery as PropertyStatus)) {
          status = statusQuery as PropertyStatus;
        } else {
          sendError(res, 'VALIDATION_ERROR', `Status must be one of: ${Object.values(PropertyStatus).join(', ')}`, 400);
          return;
        }
      }

      // 4. Parse search query
      const search = req.query.search ? String(req.query.search) : undefined;

      const data = await this.propertiesService.list({ page, limit, status, search });
      sendSuccess(res, data);
    } catch (error) {
      next(error);
    }
  };

  getPropertyDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id || !UUID_REGEX.test(id)) {
        sendError(res, 'PROPERTY_NOT_FOUND', 'Property not found', 404);
        return;
      }

      const property = await this.propertiesService.getById(id);
      if (!property) {
        sendError(res, 'PROPERTY_NOT_FOUND', 'Property not found', 404);
        return;
      }

      sendSuccess(res, property);
    } catch (error) {
      next(error);
    }
  };

  createProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, address, status } = req.body as { title: string; address: string; status?: PropertyStatus };
      const property = await this.propertiesService.create({ title, address, status });
      sendSuccess(res, { id: property.id }, 201);
    } catch (error) {
      next(error);
    }
  };
}

