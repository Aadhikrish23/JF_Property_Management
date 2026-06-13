import React, { useState } from 'react';
import { Modal, Input, Button } from '../../../components';
import { useCreateClient } from '../hooks';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClientModal({ isOpen, onClose }: CreateClientModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const createMutation = useCreateClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      { name, email: email || undefined, phone: phone || undefined },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setPhone('');
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Client"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={createMutation.isPending || !name}
          >
            {createMutation.isPending ? 'Saving...' : 'Save Client'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jane Doe"
          required
        />
        <Input
          label="Email (Optional)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
        />
        <Input
          label="Phone (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 555-0123"
        />
        {createMutation.isError && (
          <p className="text-sm text-red-600">Error creating client.</p>
        )}
      </form>
    </Modal>
  );
}
