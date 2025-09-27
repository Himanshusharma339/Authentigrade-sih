import React from "react";
import Icon from "../../../components/AppIcon";

const MetricsCard = ({ title, value, change, changeType, icon, trend }) => {
  const getChangeColor = () => {
    if (changeType === "positive") return "text-success";
    if (changeType === "negative") return "text-destructive";
    return "text-muted-foreground";
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return "TrendingUp";
    if (changeType === "negative") return "TrendingDown";
    return "Minus";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend && (
          <div className="w-16 h-8 bg-muted/50 rounded flex items-center justify-center">
            <Icon
              name="BarChart3"
              size={14}
              className="text-muted-foreground"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-semibold text-foreground">{value}</div>
        {change && (
          <div
            className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}
          >
            <Icon name={getChangeIcon()} size={14} />
            <span>{change}</span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
