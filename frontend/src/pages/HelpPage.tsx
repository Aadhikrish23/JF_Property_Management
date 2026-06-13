import { Card } from '../components/ui';
import { PageContainer } from '../components/layout';

export function HelpPage() {
  return (
    <PageContainer
      title="Help & Support"
      description="Quick reference guide for using the JF Property Management CRM."
    >
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Application Overview
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            JF Property Management CRM is designed to manage properties,
            clients, viewings, tasks, notifications, and daily workflow
            activities from a single dashboard.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Demo Credentials
          </h2>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Admin:</span>{' '}
              admin@crm.local
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Manager:</span>{' '}
              manager@crm.local
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Agent:</span>{' '}
              agent@crm.local
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Password:</span>{' '}
              <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono text-gray-900 dark:text-gray-200">
                demo123
              </code>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Navigation Guide
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Dashboard</strong> – Workflow overview and activity summary</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Properties</strong> – Manage property listings</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Clients</strong> – Manage client records</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Viewings</strong> – Schedule and track viewings</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Tasks</strong> – Monitor workflow tasks</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Notifications</strong> – Review system notifications</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Analytics</strong> – View key business metrics</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Search</strong> – Search across CRM records</li>
            <li>• <strong className="font-medium text-gray-900 dark:text-gray-200">Settings</strong> – Theme and account preferences</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Contact Support
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            For demonstration purposes, support is not connected to a live
            service.
          </p>
          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <div>Email: <span className="text-gray-900 dark:text-gray-200">support@crm.local</span></div>
            <div>Phone: <span className="text-gray-900 dark:text-gray-200">+44 0000 000000</span></div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
