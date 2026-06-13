import { z } from 'zod';
import { PropertyStatus } from '@prisma/client';

export const propertySchemas = {
  create: z.object({
    title: z
      .string({
        required_error: 'Property title is required',
      })
      .min(1, 'Property title cannot be empty')
      .max(255, 'Property title must not exceed 255 characters'),
    address: z
      .string({
        required_error: 'Property address is required',
      })
      .min(1, 'Property address cannot be empty'),
    status: z.nativeEnum(PropertyStatus).default(PropertyStatus.ACTIVE),
  }),
};


export const clientSchemas = {
  create: {},
};

export const viewingSchemas = {
  create: {},
};

export const taskSchemas = {
  updateStatus: {},
};
