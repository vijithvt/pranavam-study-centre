
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const StatusFilter = ({ selectedStatus, onStatusChange }: StatusFilterProps) => {
  return (
    <Select value={selectedStatus} onValueChange={onStatusChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
