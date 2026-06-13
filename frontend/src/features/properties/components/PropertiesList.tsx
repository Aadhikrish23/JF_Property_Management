import React, { useState } from 'react';
import {
  PageContainer, Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Badge, Button, Pagination, Input, Select, LoadingSpinner, EmptyState,
} from '../../../components';
import { useProperties } from '../hooks';
import { CreatePropertyModal } from './CreatePropertyModal';
import type { PropertyStatus } from '../types';

export function PropertiesList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PropertyStatus | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useProperties({
    page,
    limit: 10,
    search: search || undefined,
    status: status ? (status as PropertyStatus) : undefined,
  });

  const getStatusVariant = (s: string) => {
    if (s === 'ACTIVE') return 'success';
    if (s === 'UNDER_OFFER') return 'warning';
    return 'gray';
  };

  const formatStatus = (s: string) =>
    s === 'UNDER_OFFER' ? 'Under Offer' : s.charAt(0) + s.slice(1).toLowerCase();

  return (
    <PageContainer
      title="Properties"
      description="Manage your property listings"
      action={
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          + Add Property
        </Button>
      }
    >
      <Card>
        {/* Filters */}
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-b border-gray-100">
          <div className="flex-1">
            <Input
              placeholder="Search properties..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              value={status}
              onChange={(e) => { setStatus(e.target.value as PropertyStatus | ''); setPage(1); }}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'ACTIVE', label: 'Active' },
                { value: 'UNDER_OFFER', label: 'Under Offer' },
                { value: 'SOLD', label: 'Sold' },
              ]}
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-16 flex justify-center"><LoadingSpinner /></div>
        ) : isError ? (
          <EmptyState title="Failed to load" description="Could not fetch properties." />
        ) : data?.data.items.length === 0 ? (
          <EmptyState
            title="No properties found"
            description="Try adjusting filters or add a new property."
            action={<Button size="sm" onClick={() => setIsModalOpen(true)}>Add Property</Button>}
          />
        ) : (
          <>
            {/* Desktop / Tablet Table */}
            <div className="hidden md:block">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Address</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Added</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data!.data.items.map((property) => (
                    <TableRow key={property.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-semibold text-gray-900">{property.title}</TableCell>
                      <TableCell className="text-gray-600">{property.address}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(property.status)}>
                          {formatStatus(property.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {new Date(property.createdAt).toLocaleDateString('en-GB')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card List */}
            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
              {data!.data.items.map((property) => (
                <div key={property.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 leading-tight">{property.title}</span>
                    <Badge variant={getStatusVariant(property.status)}>
                      {formatStatus(property.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">{property.address}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Added: {new Date(property.createdAt).toLocaleDateString('en-GB')}
                  </div>
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

      <CreatePropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageContainer>
  );
}
