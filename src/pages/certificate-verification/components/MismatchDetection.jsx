import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const MismatchDetection = ({ mismatches, onResolve, onIgnore }) => {
  const [expandedMismatch, setExpandedMismatch] = useState(null);

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case "critical":
        return {
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20",
          icon: "AlertCircle",
          label: "Critical",
        };
      case "high":
        return {
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20",
          icon: "AlertTriangle",
          label: "High",
        };
      case "medium":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          icon: "Info",
          label: "Medium",
        };
      case "low":
        return {
          color: "text-muted-foreground",
          bgColor: "bg-muted/10",
          borderColor: "border-border",
          icon: "Minus",
          label: "Low",
        };
      default:
        return {
          color: "text-muted-foreground",
          bgColor: "bg-muted/10",
          borderColor: "border-border",
          icon: "Help",
          label: "Unknown",
        };
    }
  };

  const toggleExpanded = (index) => {
    setExpandedMismatch(expandedMismatch === index ? null : index);
  };

  if (!mismatches || mismatches?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon
            name="CheckCircle"
            size={48}
            className="text-success mx-auto mb-3"
          />
          <h3 className="font-semibold text-foreground mb-2">
            No Mismatches Detected
          </h3>
          <p className="text-muted-foreground">
            All extracted information matches the institutional database
            records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg md:w-[110%] lg:w-[105%]">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <div>
            <h3 className="font-semibold text-foreground">
              Mismatch Detection
            </h3>
            <p className="text-sm text-muted-foreground">
              {mismatches?.length} inconsistenc
              {mismatches?.length === 1 ? "y" : "ies"} found
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Risk Level:
            <span
              className={`ml-1 font-medium ${
                mismatches?.some((m) => m?.severity === "critical")
                  ? "text-destructive"
                  : mismatches?.some((m) => m?.severity === "high")
                  ? "text-warning"
                  : "text-blue-600"
              }`}
            >
              {mismatches?.some((m) => m?.severity === "critical")
                ? "Critical"
                : mismatches?.some((m) => m?.severity === "high")
                ? "High"
                : "Medium"}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {mismatches?.map((mismatch, index) => {
          const severityConfig = getSeverityConfig(mismatch?.severity);
          const isExpanded = expandedMismatch === index;

          return (
            <div
              key={index}
              className={`border rounded-lg ${severityConfig?.borderColor}`}
            >
              <div
                className={`p-4 cursor-pointer ${severityConfig?.bgColor}`}
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={severityConfig?.icon}
                      size={20}
                      className={severityConfig?.color}
                    />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {mismatch?.field}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mismatch?.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${severityConfig?.bgColor} ${severityConfig?.color}`}
                    >
                      {severityConfig?.label}
                    </span>
                    <Icon
                      name={isExpanded ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="p-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground mb-2">
                        Extracted Value
                      </h5>
                      <div className="p-3 bg-muted/30 rounded border">
                        <code className="text-sm text-foreground">
                          {mismatch?.extractedValue}
                        </code>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-muted-foreground mb-2">
                        Expected Value
                      </h5>
                      <div className="p-3 bg-muted/30 rounded border">
                        <code className="text-sm text-foreground">
                          {mismatch?.expectedValue}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-muted-foreground mb-2">
                      Detailed Analysis
                    </h5>
                    <div className="p-3 bg-muted/30 rounded text-sm text-foreground">
                      {mismatch?.analysis}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-muted-foreground mb-2">
                      Recommended Actions
                    </h5>
                    <ul className="list-disc list-inside text-sm text-foreground space-y-1">
                      {mismatch?.recommendedActions?.map(
                        (action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Confidence: {mismatch?.confidence}% • Source:{" "}
                      {mismatch?.source}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onIgnore?.(mismatch?.id)}
                      >
                        Ignore
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onResolve?.(mismatch?.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {mismatches?.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {mismatches?.filter((m) => m?.severity === "critical")?.length}{" "}
              critical,{" "}
              {mismatches?.filter((m) => m?.severity === "high")?.length} high
              priority issues
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export Analysis
              </Button>
              <Button variant="default" size="sm">
                Bulk Resolve
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MismatchDetection;
