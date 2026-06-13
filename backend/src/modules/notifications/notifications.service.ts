import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.config';

export interface ListNotificationsFilters {
  page?: number;
  limit?: number;
  isRead?: boolean;
}

export class NotificationsService {
  async list(filters: ListNotificationsFilters) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.NotificationWhereInput = {};

    if (filters.isRead !== undefined) {
      where.isRead = filters.isRead;
    }

    const [items, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
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
    return prisma.notification.findUnique({
      where: { id },
    });
  }

  async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
