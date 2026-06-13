import { Request, Response, NextFunction } from 'express';
import { PropertiesService } from './properties.service';

export class PropertiesController {
  private propertiesService = new PropertiesService();

  listProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: list properties from service
      res.status(200).json({ success: true, message: 'listProperties placeholder' });
    } catch (error) {
      next(error);
    }
  };

  getPropertyDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: get property by id
      res.status(200).json({ success: true, message: 'getPropertyDetails placeholder' });
    } catch (error) {
      next(error);
    }
  };

  createProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Placeholder: create property
      res.status(201).json({ success: true, message: 'createProperty placeholder' });
    } catch (error) {
      next(error);
    }
  };
}
