import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const institutionOptions = [
    { value: 'all', label: 'All Institutions' },
    { value: 'stanford', label: 'Stanford University' },
    { value: 'mit', label: 'MIT' },
    { value: 'harvard', label: 'Harvard University' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'caltech', label: 'Caltech' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'degree', label: 'Degree' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'transcript', label: 'Transcript' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const hasActiveFilters = filters?.search || 
    filters?.institution !== 'all' || 
    filters?.type !== 'all' || 
    filters?.status !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Certificates</span>
        </h2>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
            <span>Clear</span>
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {/* Search */}
        <Input
          type="search"
          placeholder="Search certificates..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        {/* Institution Filter */}
        <Select
          label="Institution"
          options={institutionOptions}
          value={filters?.institution}
          onChange={(value) => onFilterChange('institution', value)}
        />

        {/* Certificate Type Filter */}
        <Select
          label="Certificate Type"
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
        />

        {/* Status Filter */}
        <Select
          label="Verification Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            label="From Date"
            value={filters?.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
          />
          <Input
            type="date"
            label="To Date"
            value={filters?.dateTo}
            onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
          />
        </div>
      </div>
      {/* Quick Filters */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Quick Filters</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters?.status === 'verified' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('status', filters?.status === 'verified' ? 'all' : 'verified')}
          >
            <Icon name="CheckCircle" size={14} />
            <span>Verified Only</span>
          </Button>
          
          <Button
            variant={filters?.status === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('status', filters?.status === 'pending' ? 'all' : 'pending')}
          >
            <Icon name="Clock" size={14} />
            <span>Pending</span>
          </Button>
          
          <Button
            variant={filters?.type === 'degree' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('type', filters?.type === 'degree' ? 'all' : 'degree')}
          >
            <Icon name="GraduationCap" size={14} />
            <span>Degrees</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;