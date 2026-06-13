import { z } from 'zod';
import { PropertyStatus, ViewingStatus, TaskStatus } from '@prisma/client';

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
  create: z.object({
    propertyId: z
      .string({ required_error: 'Property ID is required' })
      .uuid('Property ID must be a valid UUID'),
    clientId: z
      .string({ required_error: 'Client ID is required' })
      .uuid('Client ID must be a valid UUID'),
    dateTime: z
      .string({ required_error: 'Date and time is required' })
      .datetime({ message: 'Date and time must be a valid ISO 8601 datetime' }),
    status: z.nativeEnum(ViewingStatus, {
      required_error: 'Status is required',
      invalid_type_error: `Status must be one of: ${Object.values(ViewingStatus).join(', ')}`,
    }),
  }),
};

export const taskSchemas = {
  updateStatus: z.object({
    status: z.nativeEnum(TaskStatus, {
      required_error: 'Status is required',
      invalid_type_error: `Status must be one of: ${Object.values(TaskStatus).join(', ')}`,
    }),
  }),
};

export const searchSchemas = {
  global: z.object({
    q: z
      .string({ required_error: 'Query parameter q is required' })
      .min(2, 'Search query must be at least 2 characters long')
      .max(100, 'Search query must not exceed 100 characters'),
  }),
};
