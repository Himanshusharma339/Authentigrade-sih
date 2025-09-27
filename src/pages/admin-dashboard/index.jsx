import React, { useState } from "react";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import MetricsCard from "./components/MetricsCard";
import ActivityFeed from "./components/ActivityFeed";
import AnalyticsTab from "./components/AnalyticsTab";
import SecurityTab from "./components/SecurityTab";
import SystemTab from "./components/SystemTab";
import AIInsightsTab from "./components/AIInsightsTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const metricsData = [
    {
      title: "Daily Verifications",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Shield",
      trend: true,
    },
    {
      title: "Fraud Detection Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "AlertTriangle",
      trend: true,
    },
    {
      title: "System Uptime",
      value: "99.97%",
      change: "+0.02%",
      changeType: "positive",
      icon: "Server",
      trend: true,
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.3%",
      changeType: "positive",
      icon: "Users",
      trend: true,
    },
  ];

  const tabs = [
    { id: "analytics", name: "Analytics", icon: "BarChart3" },
    { id: "ai-insights", name: "AI Insights", icon: "Brain" },
    { id: "security", name: "Security", icon: "Shield" },
    { id: "system", name: "System", icon: "Settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsTab />;
      case "ai-insights":
        return <AIInsightsTab />;
      case "security":
        return <SecurityTab />;
      case "system":
        return <SystemTab />;
      default:
        return <AnalyticsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 p-3">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Monitor platform-wide verification activities and system
                security
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" iconName="FileText" iconPosition="left">
                Generate Report
              </Button>
              <Button variant="default" iconName="Settings" iconPosition="left">
                System Settings
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                trend={metric?.trend}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="UserX"
                    iconPosition="left"
                    className="justify-start"
                  >
                    Manage Blacklist
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Bell"
                    iconPosition="left"
                    className="justify-start"
                  >
                    Configure Alerts
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                    className="justify-start"
                  >
                    Export Audit Log
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Database"
                    iconPosition="left"
                    className="justify-start"
                  >
                    Database Backup
                  </Button>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      API Health
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">
                        Healthy
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Database
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      OCR Service
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-sm font-medium text-warning">
                        Degraded
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Blockchain
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">
                        Synced
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="bg-sky-50 rounded-lg border border-gray-200">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs?.map((tab) => {
                  const Icon = tab?.icon;
                  return (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab?.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab?.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">{renderTabContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
