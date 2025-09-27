import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const ReportFilters = ({ onFiltersChange, onGenerateReport }) => {
  const [filters, setFilters] = useState({
    dateRange: "last30days",
    startDate: "",
    endDate: "",
    institution: "all",
    verificationStatus: "all",
    reportType: "summary",
  });

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "last90days", label: "Last 90 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  const institutionOptions = [
    { value: "all", label: "All Institutions" },
    { value: "prestige", label: "Prestige University" },
    { value: "mit", label: "MIT" },
    { value: "IGNTU", label: "Indira Gandhi National Tribal University" },
    { value: "medicaps", label: "Medicaps University" },
    { value: "trs", label: "Thapar Institute of Engineering and Technology" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "verified", label: "Verified" },
    { value: "rejected", label: "Rejected" },
    { value: "pending", label: "Pending" },
    { value: "flagged", label: "Flagged" },
  ];

  const reportTypeOptions = [
    { value: "summary", label: "Summary Analytics" },
    { value: "detailed", label: "Detailed Verification Logs" },
    { value: "fraud", label: "Fraud Detection Summary" },
    { value: "institutional", label: "Institutional Comparison" },
  ];

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleGenerateReport = () => {
    onGenerateReport(filters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Report Filters
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure parameters for report generation
            </p>
          </div>
        </div>
        <Button
          variant="default"
          onClick={handleGenerateReport}
          iconName="FileText"
          iconPosition="left"
        >
          Generate Report
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange("dateRange", value)}
          />

          {filters?.dateRange === "custom" && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Date"
                type="date"
                value={filters?.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e?.target?.value)
                }
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.endDate}
                onChange={(e) =>
                  handleFilterChange("endDate", e?.target?.value)
                }
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Select
            label="Institution"
            options={institutionOptions}
            value={filters?.institution}
            onChange={(value) => handleFilterChange("institution", value)}
            searchable
          />

          <Select
            label="Verification Status"
            options={statusOptions}
            value={filters?.verificationStatus}
            onChange={(value) =>
              handleFilterChange("verificationStatus", value)
            }
          />
        </div>

        <div className="space-y-4">
          <Select
            label="Report Type"
            options={reportTypeOptions}
            value={filters?.reportType}
            onChange={(value) => handleFilterChange("reportType", value)}
          />

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Calendar">
              Schedule
            </Button>
            <Button variant="outline" size="sm" iconName="Share2">
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
