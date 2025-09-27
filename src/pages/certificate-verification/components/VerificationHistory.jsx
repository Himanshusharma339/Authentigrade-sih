import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const VerificationHistory = ({ history, similarCertificates, fraudAlerts }) => {
  const [activeTab, setActiveTab] = useState("history");

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return { icon: "CheckCircle", color: "text-success" };
      case "flagged":
        return { icon: "AlertTriangle", color: "text-warning" };
      case "invalid":
        return { icon: "XCircle", color: "text-destructive" };
      default:
        return { icon: "Clock", color: "text-muted-foreground" };
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case "high":
        return "text-destructive bg-destructive/10";
      case "medium":
        return "text-warning bg-warning/10";
      case "low":
        return "text-success bg-success/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const tabs = [
    { id: "history", label: "History", icon: "Clock", count: history?.length },
    {
      id: "similar",
      label: "Similar",
      icon: "Copy",
      count: similarCertificates?.length,
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: "AlertTriangle",
      count: fraudAlerts?.length,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg md:w-[110%] lg:w-[105%]">
      <div className="flex items-center space-x-3 p-4 border-b border-border">
        <Icon name="History" size={20} className="text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">
            Verification Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Historical data and pattern analysis
          </p>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab?.id
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.count > 0 && (
              <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="p-4">
        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {history?.length === 0 ? (
              <div className="text-center py-8">
                <Icon
                  name="Clock"
                  size={48}
                  className="text-muted-foreground mx-auto mb-3"
                />
                <p className="text-muted-foreground">
                  No verification history available
                </p>
              </div>
            ) : (
              history?.map((item, index) => {
                const statusConfig = getStatusIcon(item?.status);
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <Icon
                      name={statusConfig?.icon}
                      size={16}
                      className={`${statusConfig?.color} mt-1`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {item?.action}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item?.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item?.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>User: {item?.user}</span>
                        <span>IP: {item?.ipAddress}</span>
                        {item?.verificationId && (
                          <span>ID: {item?.verificationId}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Similar Certificates Tab */}
        {activeTab === "similar" && (
          <div className="space-y-4">
            {similarCertificates?.length === 0 ? (
              <div className="text-center py-8">
                <Icon
                  name="Copy"
                  size={48}
                  className="text-muted-foreground mx-auto mb-3"
                />
                <p className="text-muted-foreground">
                  No similar certificates found
                </p>
              </div>
            ) : (
              similarCertificates?.map((cert, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="FileText"
                        size={16}
                        className="text-primary"
                      />
                      <span className="font-medium text-foreground">
                        {cert?.studentName}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(
                        cert?.riskLevel
                      )}`}
                    >
                      {cert?.similarity}% match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">
                        Institution:
                      </span>
                      <span className="ml-2 text-foreground">
                        {cert?.institution}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Year:</span>
                      <span className="ml-2 text-foreground">{cert?.year}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Certificate ID:
                      </span>
                      <span className="ml-2 text-foreground">
                        {cert?.certificateId}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span
                        className={`ml-2 font-medium ${
                          getStatusIcon(cert?.status)?.color
                        }`}
                      >
                        {cert?.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Last verified: {cert?.lastVerified}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Fraud Alerts Tab */}
        {activeTab === "alerts" && (
          <div className="space-y-4">
            {fraudAlerts?.length === 0 ? (
              <div className="text-center py-8">
                <Icon
                  name="Shield"
                  size={48}
                  className="text-success mx-auto mb-3"
                />
                <p className="text-muted-foreground">
                  No fraud alerts detected
                </p>
              </div>
            ) : (
              fraudAlerts?.map((alert, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    alert?.severity === "high"
                      ? "border-destructive/20 bg-destructive/5"
                      : alert?.severity === "medium"
                      ? "border-warning/20 bg-warning/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="AlertTriangle"
                      size={20}
                      className={
                        alert?.severity === "high"
                          ? "text-destructive"
                          : alert?.severity === "medium"
                          ? "text-warning"
                          : "text-muted-foreground"
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">
                          {alert?.title}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(
                            alert?.severity
                          )}`}
                        >
                          {alert?.severity} risk
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {alert?.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">
                            Pattern:
                          </span>
                          <span className="ml-2 text-foreground">
                            {alert?.pattern}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Confidence:
                          </span>
                          <span className="ml-2 text-foreground">
                            {alert?.confidence}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          Detected: {alert?.detectedAt}
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Investigate
                          </Button>
                          <Button variant="destructive" size="sm">
                            Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationHistory;
