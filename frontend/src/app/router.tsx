import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { ClientsPage } from '../pages/ClientsPage';
import { ViewingsPage } from '../pages/ViewingsPage';
import { TasksPage } from '../pages/TasksPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/viewings" element={<ViewingsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
