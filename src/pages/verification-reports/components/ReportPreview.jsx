import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ReportPreview = ({ reportData, reportType }) => {
  const verificationTrendData = [
    { month: 'Jan', verified: 1250, rejected: 85, pending: 45 },
    { month: 'Feb', verified: 1380, rejected: 92, pending: 38 },
    { month: 'Mar', verified: 1520, rejected: 78, pending: 52 },
    { month: 'Apr', verified: 1680, rejected: 95, pending: 41 },
    { month: 'May', verified: 1850, rejected: 103, pending: 47 },
    { month: 'Jun', verified: 1920, rejected: 88, pending: 35 }
  ];

  const institutionData = [
    { name: 'Harvard', value: 2850, color: '#1E3A8A' },
    { name: 'MIT', value: 2340, color: '#0EA5E9' },
    { name: 'Stanford', value: 1980, color: '#059669' },
    { name: 'Berkeley', value: 1650, color: '#D97706' },
    { name: 'Others', value: 3180, color: '#64748B' }
  ];

  const processingTimeData = [
    { day: 'Mon', avgTime: 2.3 },
    { day: 'Tue', avgTime: 1.8 },
    { day: 'Wed', avgTime: 2.1 },
    { day: 'Thu', avgTime: 1.9 },
    { day: 'Fri', avgTime: 2.5 },
    { day: 'Sat', avgTime: 1.6 },
    { day: 'Sun', avgTime: 1.4 }
  ];

  const renderSummaryAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-4">Verification Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={verificationTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="verified" fill="var(--color-success)" />
                <Bar dataKey="rejected" fill="var(--color-destructive)" />
                <Bar dataKey="pending" fill="var(--color-warning)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-4">Institution Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={institutionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                >
                  {institutionData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-4">Average Processing Time (Hours)</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processingTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="avgTime" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderDetailedLogs = () => (
    <div className="bg-muted/30 rounded-lg p-4">
      <h4 className="text-sm font-medium text-foreground mb-4">Recent Verification Activities</h4>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {[
          { id: 'CERT-2024-001', student: 'John Smith', institution: 'Harvard University', status: 'verified', time: '2 hours ago' },
          { id: 'CERT-2024-002', student: 'Sarah Johnson', institution: 'MIT', status: 'rejected', time: '3 hours ago' },
          { id: 'CERT-2024-003', student: 'Michael Brown', institution: 'Stanford', status: 'pending', time: '4 hours ago' },
          { id: 'CERT-2024-004', student: 'Emily Davis', institution: 'Berkeley', status: 'verified', time: '5 hours ago' },
          { id: 'CERT-2024-005', student: 'David Wilson', institution: 'Caltech', status: 'flagged', time: '6 hours ago' }
        ]?.map((log) => (
          <div key={log?.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                log?.status === 'verified' ? 'bg-success' :
                log?.status === 'rejected' ? 'bg-destructive' :
                log?.status === 'pending'? 'bg-warning' : 'bg-error'
              }`}></div>
              <div>
                <p className="text-sm font-medium text-foreground">{log?.id}</p>
                <p className="text-xs text-muted-foreground">{log?.student} • {log?.institution}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                log?.status === 'verified' ? 'bg-success/10 text-success' :
                log?.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                log?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
                {log?.status?.charAt(0)?.toUpperCase() + log?.status?.slice(1)}
              </span>
              <p className="text-xs text-muted-foreground mt-1">{log?.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFraudSummary = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
            <div>
              <p className="text-2xl font-bold text-error">23</p>
              <p className="text-sm text-error/80">Fraud Attempts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={24} color="var(--color-warning)" />
            <div>
              <p className="text-2xl font-bold text-warning">156</p>
              <p className="text-sm text-warning/80">Flagged Cases</p>
            </div>
          </div>
        </div>
        
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            <div>
              <p className="text-2xl font-bold text-success">98.2%</p>
              <p className="text-sm text-success/80">Detection Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-4">Fraud Pattern Analysis</h4>
        <div className="space-y-3">
          {[
            { pattern: 'Forged Institution Seals', count: 8, severity: 'high' },
            { pattern: 'Altered Grade Information', count: 6, severity: 'high' },
            { pattern: 'Invalid Certificate Numbers', count: 5, severity: 'medium' },
            { pattern: 'Suspicious Document Quality', count: 4, severity: 'low' }
          ]?.map((pattern, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  pattern?.severity === 'high' ? 'bg-error' :
                  pattern?.severity === 'medium'? 'bg-warning' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-sm font-medium text-foreground">{pattern?.pattern}</span>
              </div>
              <span className="text-sm text-muted-foreground">{pattern?.count} cases</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Report Preview</h2>
            <p className="text-sm text-muted-foreground">
              {reportType === 'summary' ? 'Summary Analytics' :
               reportType === 'detailed' ? 'Detailed Verification Logs' :
               reportType === 'fraud'? 'Fraud Detection Summary' : 'Institutional Comparison'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">Last 30 days</span>
        </div>
      </div>

      <div className="min-h-96">
        {reportType === 'summary' && renderSummaryAnalytics()}
        {reportType === 'detailed' && renderDetailedLogs()}
        {reportType === 'fraud' && renderFraudSummary()}
        {reportType === 'institutional' && renderSummaryAnalytics()}
      </div>
    </div>
  );
};

export default ReportPreview;