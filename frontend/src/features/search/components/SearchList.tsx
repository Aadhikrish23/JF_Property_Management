import React, { useState, useEffect } from 'react';
import { PageContainer, Input, Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, LoadingSpinner, EmptyState } from '../../../components';
import { useSearch } from '../hooks';

export function SearchList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isLoading, isError } = useSearch(debouncedQuery);

  const renderContent = () => {
    if (debouncedQuery.length < 2) {
      return (
        <EmptyState
          title="Search"
          description="Type at least 2 characters to search across properties and clients."
        />
      );
    }

    if (isLoading) {
      return <div className="py-16 flex justify-center"><LoadingSpinner /></div>;
    }

    if (isError) {
      return <EmptyState title="Search Failed" description="Could not fetch search results." />;
    }

    const properties = data?.data?.properties || [];
    const clients = data?.data?.clients || [];
    const hasResults = properties.length > 0 || clients.length > 0;

    if (!hasResults) {
      return <EmptyState title="No results found" description={`No matches found for "${debouncedQuery}".`} />;
    }

    return (
      <div className="space-y-6">
        {properties.length > 0 && (
          <Card>
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Properties</h2>
            </div>
            
            <div className="hidden md:block">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Address</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {properties.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-semibold text-gray-900 dark:text-white">{p.title}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{p.address}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === 'ACTIVE' ? 'success' : p.status === 'UNDER_OFFER' ? 'warning' : 'gray'}>
                          {p.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
              {properties.map((p) => (
                <div key={p.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 leading-tight">{p.title}</span>
                    <Badge variant={p.status === 'ACTIVE' ? 'success' : p.status === 'UNDER_OFFER' ? 'warning' : 'gray'}>
                      {p.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">{p.address}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {clients.length > 0 && (
          <Card>
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Clients</h2>
            </div>
            
            <div className="hidden md:block">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Phone</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-semibold text-gray-900 dark:text-white">{c.name}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{c.email || '—'}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{c.phone || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
              {clients.map((c) => (
                <div key={c.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex flex-col gap-2">
                  <div className="font-bold text-gray-900 leading-tight">{c.name}</div>
                  {c.email && <div className="text-sm text-gray-600">Email: {c.email}</div>}
                  {c.phone && <div className="text-sm text-gray-600">Phone: {c.phone}</div>}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <PageContainer title="Global Search" description="Search across all your records">
      <div className="mb-6 max-w-2xl">
        <Input
          type="search"
          placeholder="Search properties or clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-lg py-3"
        />
      </div>
      {renderContent()}
    </PageContainer>
  );
}
