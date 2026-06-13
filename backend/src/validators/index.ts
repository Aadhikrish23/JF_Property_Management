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
  create: z.object({
    name: z
      .string({
        required_error: 'Client name is required',
      })
      .min(1, 'Client name cannot be empty')
      .max(100, 'Client name must not exceed 100 characters'),
    email: z
      .string()
      .email('Email must be a valid email address')
      .max(255, 'Email must not exceed 255 characters')
      .optional(),
    phone: z
      .string()
      .max(30, 'Phone must not exceed 30 characters')
      .optional(),
  }),
};

export const viewingSchemas = {
  create: {},
};

export const taskSchemas = {
  updateStatus: {},
};
