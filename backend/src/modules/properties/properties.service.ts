import { PropertyStatus, Prisma } from '@prisma/client';

import { prisma } from '../../config/prisma.config';

export interface ListPropertiesFilters {
  page?: number;
  limit?: number;
  status?: PropertyStatus;
  search?: string;
}

export class PropertiesService {
  async list(filters: ListPropertiesFilters) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.PropertyWhereInput = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search) {
      where.OR = [
        {
          title: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          address: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.property.count({
        where,
      }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }

  async getById(id: string) {
    return prisma.property.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: { title: string; address: string; status?: PropertyStatus }) {
    return prisma.property.create({
      data: {
        title: data.title,
        address: data.address,
        status: data.status || PropertyStatus.ACTIVE,
      },
    });
  }
}

