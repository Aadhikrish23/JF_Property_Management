import { TaskType, TaskStatus, TaskPriority, Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.config';

export interface ListTasksFilters {
  page?: number;
  limit?: number;
  type?: TaskType;
  status?: TaskStatus;
  priority?: TaskPriority;
}

export class TasksService {
  async list(filters: ListTasksFilters) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = {};

    if (filters.type) {
      where.type = filters.type;
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.priority) {
      where.priority = filters.priority;
    }

    const [items, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { dueDate: 'asc' },
          { createdAt: 'desc' },
        ],
        include: {
          assignedUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      prisma.task.count({ where }),
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
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: string, status: TaskStatus) {
    return prisma.task.update({
      where: { id },
      data: { status },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }
}
