import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedReports = ({ onLoadReport, onScheduleReport }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const savedReports = [
    {
      id: 'RPT-001',
      name: 'Monthly Verification Summary',
      description: 'Comprehensive monthly analytics with fraud detection metrics',
      type: 'summary',
      lastGenerated: '2024-09-10 14:30:00',
      frequency: 'monthly',
      nextRun: '2024-10-10 14:30:00',
      status: 'active',
      size: '2.4 MB'
    },
    {
      id: 'RPT-002',
      name: 'Weekly Institution Report',
      description: 'Institution-wise verification statistics and trends',
      type: 'institutional',
      lastGenerated: '2024-09-13 09:00:00',
      frequency: 'weekly',
      nextRun: '2024-09-20 09:00:00',
      status: 'active',
      size: '1.8 MB'
    },
    {
      id: 'RPT-003',
      name: 'Fraud Detection Analysis',
      description: 'Detailed fraud patterns and prevention metrics',
      type: 'fraud',
      lastGenerated: '2024-09-12 16:45:00',
      frequency: 'bi-weekly',
      nextRun: '2024-09-26 16:45:00',
      status: 'paused',
      size: '3.1 MB'
    },
    {
      id: 'RPT-004',
      name: 'Daily Processing Logs',
      description: 'Detailed verification logs with processing times',
      type: 'detailed',
      lastGenerated: '2024-09-14 08:00:00',
      frequency: 'daily',
      nextRun: '2024-09-15 08:00:00',
      status: 'active',
      size: '5.2 MB'
    }
  ];

  const filteredReports = savedReports?.filter(report =>
    report?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    report?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'summary': return 'BarChart3';
      case 'detailed': return 'FileText';
      case 'fraud': return 'Shield';
      case 'institutional': return 'Building';
      default: return 'File';
    }
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
          status === 'active' ? 'bg-success' : 'bg-warning'
        }`}></div>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BookmarkCheck" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Saved Reports</h2>
            <p className="text-sm text-muted-foreground">Manage scheduled and saved report templates</p>
          </div>
        </div>
        
        <Button variant="outline" iconName="Plus" iconPosition="left">
          New Template
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search saved reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
      </div>
      <div className="space-y-4">
        {filteredReports?.map((report) => (
          <div key={report?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(report?.type)} size={20} color="var(--color-muted-foreground)" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground">{report?.name}</h3>
                    {getStatusBadge(report?.status)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{report?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>Last: {formatDate(report?.lastGenerated)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>Next: {formatDate(report?.nextRun)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="HardDrive" size={12} />
                      <span>{report?.size}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="RotateCcw" size={12} />
                      <span>{report?.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onLoadReport(report)}
                  iconName="Play"
                >
                  Run
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="Download"
                >
                  Download
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onScheduleReport(report)}
                  iconName="Settings"
                >
                  Configure
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="Share2"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredReports?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="BookmarkCheck" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No saved reports found</h3>
          <p className="text-muted-foreground mb-4">Create your first report template to get started</p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Create Report Template
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedReports;