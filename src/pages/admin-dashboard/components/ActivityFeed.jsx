import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ActivityFeed = () => {
  const [filter, setFilter] = useState("all");

  const activities = [
    {
      id: 1,
      type: "verification",
      title: "Certificate Verified",
      description: "MIT Computer Science degree verified for Manoj Kumar",
      institution: "MIT",
      timestamp: "2 minutes ago",
      status: "success",
      severity: "low",
    },
    {
      id: 2,
      type: "fraud",
      title: "Fraudulent Document Detected",
      description:
        "Fake IGNTU MBA certificate flagged for suspicious formatting",
      institution: "IGNTU",
      timestamp: "5 minutes ago",
      status: "warning",
      severity: "high",
    },
    {
      id: 3,
      type: "system",
      title: "System Alert",
      description: "High verification volume detected - 150% above normal",
      institution: "System",
      timestamp: "12 minutes ago",
      status: "info",
      severity: "medium",
    },
    {
      id: 4,
      type: "security",
      title: "Suspicious Login Attempt",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      institution: "Security",
      timestamp: "18 minutes ago",
      status: "error",
      severity: "high",
    },
    {
      id: 5,
      type: "verification",
      title: "Bulk Upload Completed",
      description: "Harvard uploaded 250 certificates for batch verification",
      institution: "Harvard",
      timestamp: "25 minutes ago",
      status: "success",
      severity: "low",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "verification":
        return "Shield";
      case "fraud":
        return "AlertTriangle";
      case "system":
        return "Server";
      case "security":
        return "Lock";
      default:
        return "Activity";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "error":
        return "text-destructive";
      case "info":
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      low: "bg-success/10 text-success",
      medium: "bg-warning/10 text-warning",
      high: "bg-destructive/10 text-destructive",
    };
    return colors?.[severity] || colors?.low;
  };

  const filteredActivities =
    filter === "all"
      ? activities
      : activities?.filter((activity) => activity?.type === filter);

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Real-time Activity Feed
          </h2>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>

        <div className="flex space-x-2">
          {["all", "verification", "fraud", "system", "security"]?.map(
            (filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="capitalize"
              >
                {filterType}
              </Button>
            )
          )}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity) => (
          <div
            key={activity?.id}
            className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(
                  activity?.status
                )} bg-current/10`}
              >
                <Icon
                  name={getActivityIcon(activity?.type)}
                  size={16}
                  className={getStatusColor(activity?.status)}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(
                        activity?.severity
                      )}`}
                    >
                      {activity?.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {activity?.timestamp}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>

                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Building" size={12} />
                    <span>{activity?.institution}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
