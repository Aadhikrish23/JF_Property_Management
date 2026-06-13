import { CalendarEvent, Notification, Task, TaskStatus, User } from '@prisma/client';

import { prisma } from '../../config/prisma.config';

export interface DashboardSummary {
  chaseUps: (Task & { assignedUser: Pick<User, 'id' | 'name' | 'role'> | null })[];
  workflowTasks: (Task & { assignedUser: Pick<User, 'id' | 'name' | 'role'> | null })[];
  notifications: Notification[];
  upcomingActivities: CalendarEvent[];
}

export class DashboardService {
  async getSummary(): Promise<DashboardSummary> {
    // Fetch all required data in parallel
    const [tasks, notifications, calendarEvents] = await Promise.all([
      prisma.task.findMany({
        include: {
          assignedUser: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
      }),
      prisma.notification.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.calendarEvent.findMany({
        orderBy: {
          dateTime: 'asc',
        },
      }),
    ]);

    // Sort tasks in memory: dueDate ascending (nulls last), then priority descending
    const priorityWeights: Record<string, number> = {
      URGENT: 4,
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    const sortedTasks = [...tasks].sort((a, b) => {
      // 1. Sort by dueDate (nulls last)
      if (a.dueDate && b.dueDate) {
        const timeDiff = a.dueDate.getTime() - b.dueDate.getTime();
        if (timeDiff !== 0) {
          return timeDiff;
        }
      } else if (a.dueDate) {
        return -1; // a has dueDate, b is null -> a comes first
      } else if (b.dueDate) {
        return 1;  // b has dueDate, a is null -> b comes first
      }

      // 2. Sort by priority descending (if due dates are equal or both null)
      const weightA = priorityWeights[a.priority] || 0;
      const weightB = priorityWeights[b.priority] || 0;
      return weightB - weightA;
    });

    // Derive chaseUps: tasks that are PENDING or IN_PROGRESS
    const chaseUps = sortedTasks.filter(
      (task) =>
        task.status === TaskStatus.PENDING ||
        task.status === TaskStatus.IN_PROGRESS
    );

    return {
      chaseUps,
      workflowTasks: sortedTasks,
      notifications,
      upcomingActivities: calendarEvents,
    };
  }
}

