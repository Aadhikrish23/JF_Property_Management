import  { type JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { ClientsPage } from '../pages/ClientsPage';
import { ViewingsPage } from '../pages/ViewingsPage';
import { TasksPage } from '../pages/TasksPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { SearchPage } from '../pages/SearchPage';
import { useAuth } from '../features/auth';
import { HelpPage } from '../pages/HelpPage';
function PublicRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : children;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/viewings" element={<ViewingsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
