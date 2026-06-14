import { PageContainer, Card, LoadingSpinner, EmptyState } from '../../../components';
import { useProperties } from '../../properties';
import { useClients } from '../../clients';
import { useViewings } from '../../viewings';
import { useTasks } from '../../tasks';

export function AnalyticsDashboard() {
  const { data: properties, isLoading: propsLoading, isError: propsError } = useProperties({ limit: 1 });
  const { data: clients, isLoading: clientsLoading, isError: clientsError } = useClients({ limit: 1 });
  const { data: viewings, isLoading: viewingsLoading, isError: viewingsError } = useViewings({ limit: 1 });
  const { data: tasks, isLoading: tasksLoading, isError: tasksError } = useTasks({ limit: 1 });

  const isLoading = propsLoading || clientsLoading || viewingsLoading || tasksLoading;
  const isError = propsError || clientsError || viewingsError || tasksError;

  return (
    <PageContainer
      title="Analytics"
      description="Key performance indicators"
    >
      {isLoading ? (
        <div className="py-16 flex justify-center"><LoadingSpinner size="lg" /></div>
      ) : isError ? (
         <EmptyState title="Error loading analytics" description="Could not fetch data for KPIs." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Properties</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{properties?.data.pagination.total || 0}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Clients</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{clients?.data.pagination.total || 0}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Viewings</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{viewings?.data.pagination.total || 0}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Tasks</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{tasks?.data.pagination.total || 0}</p>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}
