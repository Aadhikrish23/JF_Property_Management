import React, { useState, useEffect } from 'react';
import { PageContainer, Card, Button } from '../../../components';

export function SettingsView() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
      if (saved === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleLogout = () => {
    console.log('Logout clicked - placeholder');
  };

  return (
    <PageContainer
      title="Settings"
      description="Manage application preferences and your account"
    >
      <div className="space-y-6 max-w-3xl">
        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Appearance</h2>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => handleThemeChange('light')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Light Theme</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => handleThemeChange('dark')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Dark Theme</span>
              </label>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4">Account</h2>
             <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Sign Out</p>
                  <p className="text-sm text-gray-500">Log out of your current session on this device.</p>
                </div>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
             </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
