import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { ClientsPage } from '../pages/ClientsPage';
import { ViewingsPage } from '../pages/ViewingsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/viewings" element={<ViewingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
