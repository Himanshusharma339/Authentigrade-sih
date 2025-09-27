import React, { useState } from "react";
import Header from "../../components/ui/Header";
import MetricsCard from "./components/MetricsCard";
import ActivityTable from "./components/ActivityTable";
import TabNavigation from "./components/TabNavigation";
import CertificateManagement from "./components/CertificateManagement";
import VerificationActivity from "./components/VerificationActivity";
import InstitutionProfile from "./components/InstitutionProfile";
import QuickActions from "./components/QuickActions";

const UniversityDashboard = () => {
  const [activeTab, setActiveTab] = useState("management");

  const metricsData = [
    {
      title: "Total Certificates Issued",
      value: "12,847",
      change: "+8.2%",
      changeType: "positive",
      icon: "FileText",
      color: "primary",
    },
    {
      title: "Pending Verifications",
      value: "234",
      change: "+12",
      changeType: "neutral",
      icon: "Clock",
      color: "warning",
    },
    {
      title: "Flagged Documents",
      value: "18",
      change: "-3",
      changeType: "positive",
      icon: "AlertTriangle",
      color: "error",
    },
    {
      title: "Monthly Verifications",
      value: "3,456",
      change: "+15.7%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "success",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "management":
        return <CertificateManagement />;
      case "activity":
        return <VerificationActivity />;
      case "profile":
        return <InstitutionProfile />;
      default:
        return <CertificateManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-background bg-indigo-100">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-foreground">
                  University Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage certificate databases, monitor verification activities,
                  and oversee institutional workflows
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Last updated
                </div>
                <div className="text-sm font-medium text-foreground">
                  {new Date()?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6 w-full">
              {/* Tab Navigation */}
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Tab Content */}
              <div className="min-h-[600px]">{renderTabContent()}</div>

              {/* Activity Table */}
              <ActivityTable />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UniversityDashboard;
