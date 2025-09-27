import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ReportFilters from "./components/ReportFilters";
import ReportPreview from "./components/ReportPreview";
import ReportTable from "./components/ReportTable";
import ExportOptions from "./components/ExportOptions";
import SavedReports from "./components/SavedReports";

const VerificationReports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [reportFilters, setReportFilters] = useState({
    dateRange: "last30days",
    institution: "all",
    verificationStatus: "all",
    reportType: "summary",
  });
  const [reportData, setReportData] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    document.title = "Verification Reports - CertifyGuard";
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "records", label: "Records", icon: "Table" },
    { id: "export", label: "Export", icon: "Download" },
    { id: "saved", label: "Saved Reports", icon: "BookmarkCheck" },
  ];

  const handleFiltersChange = (filters) => {
    setReportFilters(filters);
  };

  const handleGenerateReport = async (filters) => {
    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setReportData({
        filters,
        generatedAt: new Date()?.toISOString(),
        totalRecords: 12450,
        verifiedCount: 11890,
        rejectedCount: 380,
        pendingCount: 180,
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handleExportData = (exportConfig) => {
    console.log("Exporting data:", exportConfig);
    // Simulate export process
    setTimeout(() => {
      alert(
        `Report exported successfully as ${exportConfig?.format?.toUpperCase()}`
      );
    }, 1000);
  };

  const handleLoadReport = (report) => {
    setReportFilters({
      ...reportFilters,
      reportType: report?.type,
    });
    setActiveTab("overview");
  };

  const handleScheduleReport = (report) => {
    console.log("Scheduling report:", report);
    alert(`Report "${report?.name}" scheduling options would open here`);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <ReportFilters
              onFiltersChange={handleFiltersChange}
              onGenerateReport={handleGenerateReport}
            />
            {isGenerating ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name="BarChart3"
                    size={32}
                    color="var(--color-primary)"
                    className="animate-pulse"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Generating Report
                </h3>
                <p className="text-muted-foreground">
                  Please wait while we process your data...
                </p>
              </div>
            ) : (
              <ReportPreview
                reportData={reportData}
                reportType={reportFilters?.reportType}
              />
            )}
          </div>
        );

      case "records":
        return <ReportTable data={reportData} onExport={handleExportData} />;

      case "export":
        return (
          <ExportOptions
            onExport={handleExportData}
            selectedRecords={selectedRecords}
          />
        );

      case "saved":
        return (
          <SavedReports
            onLoadReport={handleLoadReport}
            onScheduleReport={handleScheduleReport}
          />
        );

      default:
        return null;
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
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Verification Reports
                  </h1>
                  <p className="text-muted-foreground">
                    Comprehensive analytics and documentation for certificate
                    verification activities
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Report
                </Button>
                <Button variant="default" iconName="Share2" iconPosition="left">
                  Share Results
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Verifications
                  </p>
                  <p className="text-2xl font-bold text-foreground">12,450</p>
                  <p className="text-xs text-success">+8.2% from last month</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon
                    name="FileCheck"
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">95.4%</p>
                  <p className="text-xs text-success">+2.1% from last month</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon
                    name="CheckCircle"
                    size={24}
                    color="var(--color-success)"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Fraud Detected
                  </p>
                  <p className="text-2xl font-bold text-foreground">23</p>
                  <p className="text-xs text-error">+12 from last month</p>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon
                    name="AlertTriangle"
                    size={24}
                    color="var(--color-error)"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg. Processing
                  </p>
                  <p className="text-2xl font-bold text-foreground">2.3h</p>
                  <p className="text-xs text-success">-0.4h from last month</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} color="var(--color-warning)" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="flex items-center space-x-1 p-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">{getTabContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default VerificationReports;
