import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ onExport, selectedRecords }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedFields, setSelectedFields] = useState([
    'id', 'studentName', 'institution', 'verificationStatus', 'timestamp'
  ]);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' },
    { value: 'json', label: 'JSON Data' }
  ];

  const fieldOptions = [
    { id: 'id', label: 'Certificate ID', checked: selectedFields?.includes('id') },
    { id: 'studentName', label: 'Student Name', checked: selectedFields?.includes('studentName') },
    { id: 'institution', label: 'Institution', checked: selectedFields?.includes('institution') },
    { id: 'certificateType', label: 'Certificate Type', checked: selectedFields?.includes('certificateType') },
    { id: 'verificationStatus', label: 'Verification Status', checked: selectedFields?.includes('verificationStatus') },
    { id: 'timestamp', label: 'Timestamp', checked: selectedFields?.includes('timestamp') },
    { id: 'processingTime', label: 'Processing Time', checked: selectedFields?.includes('processingTime') },
    { id: 'verifiedBy', label: 'Verified By', checked: selectedFields?.includes('verifiedBy') }
  ];

  const handleFieldToggle = (fieldId) => {
    setSelectedFields(prev =>
      prev?.includes(fieldId)
        ? prev?.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportData = {
      format: exportFormat,
      fields: selectedFields,
      includeCharts,
      records: selectedRecords,
      timestamp: new Date()?.toISOString()
    };

    // Simulate export process
    setTimeout(() => {
      onExport(exportData);
      setIsExporting(false);
    }, 2000);
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'excel': return 'FileSpreadsheet';
      case 'csv': return 'FileSpreadsheet';
      case 'json': return 'FileCode';
      default: return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Download" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Export Options</h2>
          <p className="text-sm text-muted-foreground">
            Configure export settings for {selectedRecords?.length || 0} records
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <Select
            label="Export Format"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />
          <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name={getFormatIcon(exportFormat)} size={16} />
            <span>
              {exportFormat === 'pdf' && 'Professional PDF report with charts and formatting'}
              {exportFormat === 'excel' && 'Excel spreadsheet with multiple sheets and formatting'}
              {exportFormat === 'csv' && 'Comma-separated values for data analysis'}
              {exportFormat === 'json' && 'Structured JSON data for API integration'}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Select Fields to Include</h3>
          <div className="grid grid-cols-2 gap-3">
            {fieldOptions?.map((field) => (
              <Checkbox
                key={field?.id}
                label={field?.label}
                checked={field?.checked}
                onChange={() => handleFieldToggle(field?.id)}
              />
            ))}
          </div>
        </div>

        {(exportFormat === 'pdf' || exportFormat === 'excel') && (
          <div>
            <Checkbox
              label="Include Charts and Visualizations"
              description="Add analytical charts and graphs to the export"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e?.target?.checked)}
            />
          </div>
        )}

        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <p>Export will include {selectedFields?.length} fields from {selectedRecords?.length || 0} records</p>
              <p className="mt-1">Estimated file size: ~{Math.ceil((selectedRecords?.length || 0) * selectedFields?.length / 100)}KB</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" iconName="Eye">
                Preview
              </Button>
              <Button 
                variant="default" 
                onClick={handleExport}
                loading={isExporting}
                iconName="Download"
                iconPosition="left"
                disabled={selectedFields?.length === 0}
              >
                {isExporting ? 'Exporting...' : 'Export Report'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {selectedFields?.length === 0 && (
        <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-sm text-warning">Please select at least one field to export</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;