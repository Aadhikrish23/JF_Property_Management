import React, { useState } from 'react';
import {
  PageContainer, Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Badge, Button, Pagination, Select, LoadingSpinner, EmptyState,
} from '../../../components';
import { useViewings } from '../hooks';
import { CreateViewingModal } from './CreateViewingModal';
import type { ViewingStatus } from '../types';

export function ViewingsList() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ViewingStatus | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useViewings({
    page,
    limit: 10,
    status: status ? (status as ViewingStatus) : undefined,
  });

  const getStatusVariant = (s: string) => {
    if (s === 'CONFIRMED') return 'success';
    if (s === 'BOOKED') return 'primary';
    return 'gray';
  };

  const formatStatus = (s: string) =>
    s.charAt(0) + s.slice(1).toLowerCase();

  return (
    <PageContainer
      title="Viewings"
      description="Manage property viewings"
      action={
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          + Book Viewing
        </Button>
      }
    >
      <Card>
        {/* Filter */}
        <div className="p-4 border-b border-gray-100">
          <div className="w-full sm:w-44">
            <Select
              value={status}
              onChange={(e) => { setStatus(e.target.value as ViewingStatus | ''); setPage(1); }}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'BOOKED', label: 'Booked' },
                { value: 'CONFIRMED', label: 'Confirmed' },
                { value: 'COMPLETED', label: 'Completed' },
              ]}
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-16 flex justify-center"><LoadingSpinner /></div>
        ) : isError ? (
          <EmptyState title="Failed to load" description="Could not fetch viewings." />
        ) : data?.data.items.length === 0 ? (
          <EmptyState
            title="No viewings found"
            description="Try adjusting filters or book a new viewing."
            action={<Button size="sm" onClick={() => setIsModalOpen(true)}>Book Viewing</Button>}
          />
        ) : (
          <>
            <div className="hidden md:block">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Date & Time</TableHeader>
                    <TableHeader>Property</TableHeader>
                    <TableHeader>Client</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data!.data.items.map((viewing) => (
                    <TableRow key={viewing.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-semibold text-gray-900">
                        {new Date(viewing.dateTime).toLocaleString('en-GB', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {viewing.property?.title || '—'}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {viewing.client?.name || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(viewing.status)}>
                          {formatStatus(viewing.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
              {data!.data.items.map((viewing) => (
                <div key={viewing.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 leading-tight">
                      {new Date(viewing.dateTime).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                    <Badge variant={getStatusVariant(viewing.status)}>
                      {formatStatus(viewing.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">Property: {viewing.property?.title || '—'}</div>
                  <div className="text-sm text-gray-600">Client: {viewing.client?.name || '—'}</div>
                </div>
              ))}
            </div>

            {data && data.data.pagination.total > 10 && (
              <Pagination
                currentPage={data.data.pagination.page}
                totalPages={Math.ceil(data.data.pagination.total / data.data.pagination.limit)}
                onPageChange={setPage}
                className="border-t border-gray-100"
              />
            )}
          </>
        )}
      </Card>

      <CreateViewingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageContainer>
  );
}
