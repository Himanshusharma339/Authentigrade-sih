import React from "react";
import Icon from "../../../components/AppIcon";

const ProcessingStats = ({ files }) => {
  const stats = {
    total: files?.length,
    pending: files?.filter((f) => f?.status === "pending")?.length,
    processing: files?.filter(
      (f) =>
        f?.status === "processing" ||
        f?.status === "extracting" ||
        f?.status === "verifying"
    )?.length,
    completed: files?.filter((f) => f?.status === "completed")?.length,
    failed: files?.filter((f) => f?.status === "failed")?.length,
  };

  const statItems = [
    {
      label: "Total Files",
      value: stats?.total,
      icon: "Files",
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "Pending",
      value: stats?.pending,
      icon: "Clock",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "Processing",
      value: stats?.processing,
      icon: "Loader2",
      color: "text-primary",
      bgColor: "bg-primary/10",
      animate: stats?.processing > 0,
    },
    {
      label: "Completed",
      value: stats?.completed,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Failed",
      value: stats?.failed,
      icon: "XCircle",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  if (stats?.total === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-10 mt-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Processing Statistics
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time upload and verification status
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}
            >
              <Icon
                name={item?.icon}
                size={20}
                className={`${item?.color} ${
                  item?.animate ? "animate-spin" : ""
                }`}
              />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {item?.value}
            </div>
            <div className="text-xs text-muted-foreground">{item?.label}</div>
          </div>
        ))}
      </div>
      {stats?.total > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-foreground font-medium">
              {Math.round(
                ((stats?.completed + stats?.failed) / stats?.total) * 100
              )}
              %
            </span>
          </div>
          <div className="mt-2 w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((stats?.completed + stats?.failed) / stats?.total) * 100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStats;
