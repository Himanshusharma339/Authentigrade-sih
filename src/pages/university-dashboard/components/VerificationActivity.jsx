import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";

const VerificationActivity = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "verified", label: "Verified" },
    { value: "pending", label: "Pending" },
    { value: "flagged", label: "Flagged" },
    { value: "rejected", label: "Rejected" },
  ];

  const verificationRequests = [
    {
      id: 1,
      requestId: "VR2025001",
      studentName: "Sarah Johnson",
      certificateType: "Bachelor of Science",
      requestedBy: "TechCorp Inc.",
      verifierEmail: "hr@techcorp.com",
      status: "verified",
      priority: "high",
      submittedAt: "2025-09-16 14:30:22",
      completedAt: "2025-09-16 15:15:30",
    },
    {
      id: 2,
      requestId: "VR2025002",
      studentName: "Michael Chen",
      certificateType: "Master of Engineering",
      requestedBy: "Innovation Labs",
      verifierEmail: "verify@innovationlabs.com",
      status: "pending",
      priority: "medium",
      submittedAt: "2025-09-16 13:45:18",
      completedAt: null,
    },
    {
      id: 3,
      requestId: "VR2025003",
      studentName: "Emily Rodriguez",
      certificateType: "Bachelor of Arts",
      requestedBy: "Creative Agency",
      verifierEmail: "check@creative.com",
      status: "flagged",
      priority: "high",
      submittedAt: "2025-09-17 12:20:45",
      completedAt: null,
    },
    {
      id: 4,
      requestId: "VR2025004",
      studentName: "David Thompson",
      certificateType: "PhD Computer Science",
      requestedBy: "Research Institute",
      verifierEmail: "admin@research.org",
      status: "verified",
      priority: "low",
      submittedAt: "2025-09-18 11:15:30",
      completedAt: "2025-09-18 11:45:22",
    },
    {
      id: 5,
      requestId: "VR2025005",
      studentName: "Lisa Wang",
      certificateType: "Master of Business",
      requestedBy: "Global Corp",
      verifierEmail: "hr@globalcorp.com",
      status: "rejected",
      priority: "medium",
      submittedAt: "2025-09-18 10:30:12",
      completedAt: "2025-09-18 12:20:45",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: {
        color: "bg-success text-success-foreground",
        icon: "CheckCircle",
        label: "Verified",
      },
      pending: {
        color: "bg-warning text-warning-foreground",
        icon: "Clock",
        label: "Pending",
      },
      flagged: {
        color: "bg-error text-error-foreground",
        icon: "AlertTriangle",
        label: "Flagged",
      },
      rejected: {
        color: "bg-destructive text-destructive-foreground",
        icon: "XCircle",
        label: "Rejected",
      },
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}
      >
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "text-error", label: "High" },
      medium: { color: "text-warning", label: "Medium" },
      low: { color: "text-muted-foreground", label: "Low" },
    };

    const config = priorityConfig?.[priority] || priorityConfig?.medium;

    return (
      <span className={`text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="space-y-4 w-full md:w-[90%] lg:w-[85%]">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search by student name or request ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="md:col-span-2"
          />
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter by status"
          />
          <Input
            type="date"
            label="Filter by date"
            value={filterDate}
            onChange={(e) => setFilterDate(e?.target?.value)}
          />
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export Results
          </Button>
        </div>
      </div>
      {/* Real-time Activity Feed */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Real-time Verification Requests
              </h3>
              <p className="text-sm text-muted-foreground">
                Live feed of incoming verification requests
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {verificationRequests?.map((request) => (
            <div
              key={request?.id}
              className="p-6 hover:bg-muted/30 transition-smooth"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileCheck" size={20} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-foreground">
                        {request?.requestId}
                      </h4>
                      {getPriorityBadge(request?.priority)}
                    </div>
                    <p className="text-sm text-foreground">
                      {request?.studentName} - {request?.certificateType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested by {request?.requestedBy} (
                      {request?.verifierEmail})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {request?.submittedAt}
                      {request?.completedAt &&
                        ` • Completed: ${request?.completedAt}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(request?.status)}
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    {request?.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="CheckCircle"
                      >
                        Approve
                      </Button>
                    )}
                    {request?.status === "flagged" && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="AlertTriangle"
                      >
                        Review
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {verificationRequests?.length} active requests
            </div>
            <Button variant="outline" size="sm" iconName="ArrowRight">
              View All Requests
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationActivity;
