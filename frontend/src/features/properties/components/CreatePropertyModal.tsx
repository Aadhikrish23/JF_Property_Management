import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '../../../components';
import { useCreateProperty } from '../hooks';
import type { PropertyStatus } from '../types';

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePropertyModal({ isOpen, onClose }: CreatePropertyModalProps) {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<PropertyStatus>('ACTIVE');
  
  const createMutation = useCreateProperty();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      { title, address, status },
      {
        onSuccess: () => {
          setTitle('');
          setAddress('');
          setStatus('ACTIVE');
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Property"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={createMutation.isPending || !title || !address}
          >
            {createMutation.isPending ? 'Saving...' : 'Save Property'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 123 Main St Appt"
          required
        />
        <Input
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Full address"
          required
        />
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as PropertyStatus)}
          options={[
            { value: 'ACTIVE', label: 'Active' },
            { value: 'UNDER_OFFER', label: 'Under Offer' },
            { value: 'SOLD', label: 'Sold' },
          ]}
        />
        {createMutation.isError && (
          <p className="text-sm text-red-600">Error creating property.</p>
        )}
      </form>
    </Modal>
  );
}
