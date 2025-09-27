import React from "react";
import Icon from "../../../components/AppIcon";

const StatisticsPanel = ({ statistics }) => {
  const statItems = [
    {
      label: "Total Certificates",
      value: statistics?.totalCertificates,
      icon: "FileText",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Verified",
      value: statistics?.verifiedCertificates,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Pending",
      value: statistics?.pendingCertificates,
      icon: "Clock",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "Shared This Month",
      value: statistics?.sharedThisMonth,
      icon: "Share2",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Portfolio Statistics
        </h2>
        <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}
            >
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {item?.value}
            </div>
            <div className="text-xs text-muted-foreground">{item?.label}</div>
          </div>
        ))}
      </div>
      {/* Verification Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Verification Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(
              (statistics?.verifiedCertificates /
                statistics?.totalCertificates) *
                100
            )}
            %
          </span>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-success h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                (statistics?.verifiedCertificates /
                  statistics?.totalCertificates) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {statistics?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 ${activity?.bgColor} rounded-full flex items-center justify-center`}
              >
                <Icon
                  name={activity?.icon}
                  size={14}
                  className={activity?.color}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  {activity?.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity?.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
