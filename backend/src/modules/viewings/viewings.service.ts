import { ViewingStatus, Prisma } from '@prisma/client';

import { prisma } from '../../config/prisma.config';

export interface ListViewingsFilters {
  page?: number;
  limit?: number;
  status?: ViewingStatus;
  propertyId?: string;
  clientId?: string;
}

export interface CreateViewingData {
  propertyId: string;
  clientId: string;
  dateTime: string;
  status: ViewingStatus;
}

export class ViewingsService {
  async list(filters: ListViewingsFilters) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.ViewingWhereInput = {};

    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.propertyId) {
      where.propertyId = filters.propertyId;
    }
    if (filters.clientId) {
      where.clientId = filters.clientId;
    }

    const [items, total] = await Promise.all([
      prisma.viewing.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateTime: 'asc' },
        include: {
          property: {
            select: { id: true, title: true, address: true, status: true },
          },
          client: {
            select: { id: true, name: true, email: true, phone: true },
          },
        },
      }),
      prisma.viewing.count({ where }),
    ]);

    return {
      items,
      pagination: { page, limit, total },
    };
  }

  async propertyExists(propertyId: string): Promise<boolean> {
    const count = await prisma.property.count({ where: { id: propertyId } });
    return count > 0;
  }

  async clientExists(clientId: string): Promise<boolean> {
    const count = await prisma.client.count({ where: { id: clientId } });
    return count > 0;
  }

  async create(data: CreateViewingData) {
    return prisma.viewing.create({
      data: {
        propertyId: data.propertyId,
        clientId: data.clientId,
        dateTime: new Date(data.dateTime),
        status: data.status,
      },
    });
  }
}

