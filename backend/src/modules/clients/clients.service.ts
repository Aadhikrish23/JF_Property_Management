import { Prisma } from '@prisma/client';

import { prisma } from '../../config/prisma.config';

export interface ListClientsFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export class ClientsService {
  async list(filters: ListClientsFilters) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = {};

    if (filters.search) {
      where.OR = [
        {
          name: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          phone: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.client.count({ where }),
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
    return prisma.client.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; email?: string; phone?: string }) {
    return prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
  }
}

