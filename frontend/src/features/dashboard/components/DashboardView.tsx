import React from 'react';
import { LoadingSpinner } from '../../../components';
import { useDashboardData } from '../hooks';
import { QuickActions } from './QuickActions';
import { ChaseUpsPanel } from './ChaseUpsPanel';
import { WorkflowCommandCentre } from './WorkflowCommandCentre';
import { NotificationsPanel } from './NotificationsPanel';
import { UpcomingActivitiesPanel } from './UpcomingActivitiesPanel';

export function DashboardView() {
  const { data, isLoading, isError, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">Error loading dashboard</p>
          <p className="text-xs text-gray-500 mt-1">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  const dashboardData = data?.data;

  if (!dashboardData) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <p className="text-sm text-gray-400">No dashboard data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 min-h-full">
      {/* Quick Action Cards — full width */}
      <QuickActions />

      {/* Main 2-column layout: left content (2/3) | right panels (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT: Chase-Ups + Workflow stacked */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ChaseUpsPanel tasks={dashboardData.chaseUps} />
          <WorkflowCommandCentre tasks={dashboardData.workflowTasks} />
        </div>

        {/* RIGHT: Notifications + Upcoming stacked */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <NotificationsPanel notifications={dashboardData.notifications} />
          <UpcomingActivitiesPanel activities={dashboardData.upcomingActivities} />
        </div>
      </div>
    </div>
  );
}
