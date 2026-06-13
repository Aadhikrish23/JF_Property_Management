import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '../../../components';
import { useCreateViewing } from '../hooks';
import type { ViewingStatus } from '../types';

interface CreateViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateViewingModal({ isOpen, onClose }: CreateViewingModalProps) {
  const [propertyId, setPropertyId] = useState('');
  const [clientId, setClientId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [status, setStatus] = useState<ViewingStatus>('BOOKED');
  
  const createMutation = useCreateViewing();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      { propertyId, clientId, dateTime: new Date(dateTime).toISOString(), status },
      {
        onSuccess: () => {
          setPropertyId('');
          setClientId('');
          setDateTime('');
          setStatus('BOOKED');
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Viewing"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={createMutation.isPending || !propertyId || !clientId || !dateTime}
          >
            {createMutation.isPending ? 'Saving...' : 'Book Viewing'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Property ID"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          placeholder="UUID of property"
          required
        />
        <Input
          label="Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="UUID of client"
          required
        />
        <Input
          label="Date & Time"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ViewingStatus)}
          options={[
            { value: 'BOOKED', label: 'Booked' },
            { value: 'CONFIRMED', label: 'Confirmed' },
            { value: 'COMPLETED', label: 'Completed' },
          ]}
        />
        {createMutation.isError && (
          <p className="text-sm text-red-600">Error booking viewing. Ensure IDs are valid.</p>
        )}
      </form>
    </Modal>
  );
}
