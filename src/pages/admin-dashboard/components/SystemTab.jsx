import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SystemTab = () => {
  const apiUsageData = [
    { time: "00:00", requests: 1200, errors: 5 },
    { time: "04:00", requests: 800, errors: 2 },
    { time: "08:00", requests: 2400, errors: 12 },
    { time: "12:00", requests: 3200, errors: 8 },
    { time: "16:00", requests: 2800, errors: 15 },
    { time: "20:00", requests: 1600, errors: 3 },
  ];

  const performanceMetrics = [
    { metric: "Response Time", value: "245ms", change: "-12%", status: "good" },
    {
      metric: "Uptime",
      value: "99.97%",
      change: "+0.02%",
      status: "excellent",
    },
    { metric: "Error Rate", value: "0.03%", change: "-0.01%", status: "good" },
    {
      metric: "Throughput",
      value: "1,250 req/s",
      change: "+8%",
      status: "good",
    },
  ];

  const integrationHealth = [
    {
      name: "OCR Service",
      status: "healthy",
      uptime: "99.9%",
      lastCheck: "2 min ago",
      responseTime: "120ms",
    },
    {
      name: "Blockchain API",
      status: "healthy",
      uptime: "99.8%",
      lastCheck: "1 min ago",
      responseTime: "340ms",
    },
    {
      name: "Email Service",
      status: "warning",
      uptime: "98.5%",
      lastCheck: "5 min ago",
      responseTime: "890ms",
    },
    {
      name: "SMS Gateway",
      status: "healthy",
      uptime: "99.6%",
      lastCheck: "3 min ago",
      responseTime: "450ms",
    },
    {
      name: "Database Cluster",
      status: "healthy",
      uptime: "100%",
      lastCheck: "30 sec ago",
      responseTime: "45ms",
    },
  ];

  const systemLogs = [
    {
      id: 1,
      level: "INFO",
      message: "Certificate verification batch completed successfully",
      timestamp: "2024-09-14 15:40:23",
      service: "Verification Engine",
    },
    {
      id: 2,
      level: "WARN",
      message: "High memory usage detected on server node-03",
      timestamp: "2024-09-14 15:38:15",
      service: "System Monitor",
    },
    {
      id: 3,
      level: "ERROR",
      message: "Failed to connect to external OCR service",
      timestamp: "2024-09-14 15:35:42",
      service: "OCR Integration",
    },
    {
      id: 4,
      level: "INFO",
      message: "Database backup completed successfully",
      timestamp: "2024-09-14 15:30:00",
      service: "Backup Service",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "text-success bg-success/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "error":
        return "text-destructive bg-destructive/10";
      case "excellent":
        return "text-success bg-success/10";
      case "good":
        return "text-accent bg-accent/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case "ERROR":
        return "text-destructive bg-destructive/10";
      case "WARN":
        return "text-warning bg-warning/10";
      case "INFO":
        return "text-accent bg-accent/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* API Usage Statistics */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                API Usage Statistics
              </h3>
              <p className="text-sm text-muted-foreground">
                24-hour API request patterns
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={apiUsageData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="var(--color-accent)"
                fill="var(--color-accent)"
                fillOpacity={0.1}
                name="API Requests"
              />
              <Area
                type="monotone"
                dataKey="errors"
                stroke="var(--color-destructive)"
                fill="var(--color-destructive)"
                fillOpacity={0.1}
                name="Errors"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {/* Performance Metrics */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Gauge" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Performance Metrics
              </h3>
              <p className="text-sm text-muted-foreground">
                System performance indicators
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {performanceMetrics?.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div>
                  <div className="font-medium text-foreground">
                    {metric?.metric}
                  </div>
                  <div className="text-2xl font-semibold text-foreground mt-1">
                    {metric?.value}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      metric?.status
                    )}`}
                  >
                    {metric?.status}
                  </span>
                  <div className="text-sm text-muted-foreground mt-1">
                    {metric?.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Health */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Integration Health
              </h3>
              <p className="text-sm text-muted-foreground">
                External service status
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {integrationHealth?.map((integration, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      integration?.status
                    )}`}
                  >
                    {integration?.status}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">
                      {integration?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {integration?.lastCheck}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {integration?.uptime}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {integration?.responseTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* System Logs */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                System Logs
              </h3>
              <p className="text-sm text-muted-foreground">
                Recent system events and messages
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {systemLogs?.map((log) => (
            <div
              key={log?.id}
              className="flex items-start space-x-3 p-3 hover:bg-muted/30 rounded-lg transition-smooth"
            >
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getLogLevelColor(
                  log?.level
                )}`}
              >
                {log?.level}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground">{log?.message}</div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                  <span>{log?.timestamp}</span>
                  <span>{log?.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemTab;
