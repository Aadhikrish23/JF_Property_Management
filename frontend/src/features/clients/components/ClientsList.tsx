import React, { useState } from 'react';
import {
  PageContainer, Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Button, Pagination, Input, LoadingSpinner, EmptyState,
} from '../../../components';
import { useClients } from '../hooks';
import { CreateClientModal } from './CreateClientModal';

export function ClientsList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useClients({
    page,
    limit: 10,
    search: search || undefined,
  });

  return (
    <PageContainer
      title="Clients"
      description="Manage your client records"
      action={
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          + Add Client
        </Button>
      }
    >
      <Card>
        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <Input
            placeholder="Search clients by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-16 flex justify-center"><LoadingSpinner /></div>
        ) : isError ? (
          <EmptyState title="Failed to load" description="Could not fetch clients." />
        ) : data?.data.items.length === 0 ? (
          <EmptyState
            title="No clients found"
            description="Try adjusting your search or add a new client."
            action={<Button size="sm" onClick={() => setIsModalOpen(true)}>Add Client</Button>}
          />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Phone</TableHeader>
                  <TableHeader>Added</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {data!.data.items.map((client) => (
                  <TableRow key={client.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-semibold text-gray-900">{client.name}</TableCell>
                    <TableCell className="text-gray-600">{client.email || '—'}</TableCell>
                    <TableCell className="text-gray-600">{client.phone || '—'}</TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(client.createdAt).toLocaleDateString('en-GB')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

      <CreateClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageContainer>
  );
}
