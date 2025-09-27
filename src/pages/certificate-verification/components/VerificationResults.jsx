import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const VerificationResults = ({
  verificationData,
  onGenerateReport,
  onFlagForReview,
  onAddToBlacklist,
}) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "verified":
        return {
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/20",
          icon: "CheckCircle",
          label: "Verified",
          description:
            "Certificate is authentic and matches institutional records",
        };
      case "flagged":
        return {
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20",
          icon: "AlertTriangle",
          label: "Flagged",
          description:
            "Certificate requires manual review due to inconsistencies",
        };
      case "invalid":
        return {
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20",
          icon: "XCircle",
          label: "Invalid",
          description: "Certificate is fraudulent or does not match records",
        };
      default:
        return {
          color: "text-muted-foreground",
          bgColor: "bg-muted/10",
          borderColor: "border-border",
          icon: "Clock",
          label: "Processing",
          description: "Verification in progress",
        };
    }
  };

  const statusConfig = getStatusConfig(verificationData?.status);

  return (
    <div className="bg-card border border-border rounded-lg md:w-[110%] lg:w-[105%]">
      <div className="flex items-center space-x-3 p-4 border-b border-border">
        <Icon name="Shield" size={20} className="text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">
            Verification Results
          </h3>
          <p className="text-sm text-muted-foreground">
            Completed on {verificationData?.completedAt}
          </p>
        </div>
      </div>
      <div className="p-4">
        {/* Main Status */}
        <div
          className={`p-4 rounded-lg border ${statusConfig?.bgColor} ${statusConfig?.borderColor} mb-6`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <Icon
              name={statusConfig?.icon}
              size={24}
              className={statusConfig?.color}
            />
            <div>
              <h4 className={`text-lg font-semibold ${statusConfig?.color}`}>
                {statusConfig?.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {statusConfig?.description}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Verification ID:</span>
              <span className="ml-2 font-medium text-foreground">
                {verificationData?.verificationId}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Risk Score:</span>
              <span
                className={`ml-2 font-medium ${
                  verificationData?.riskScore <= 30
                    ? "text-success"
                    : verificationData?.riskScore <= 70
                    ? "text-warning"
                    : "text-destructive"
                }`}
              >
                {verificationData?.riskScore}/100
              </span>
            </div>
          </div>
        </div>

        {/* Verification Checks */}
        <div className="space-y-4 mb-6">
          <h5 className="font-medium text-foreground">Verification Checks</h5>

          {verificationData?.checks?.map((check, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Icon
                  name={check?.passed ? "CheckCircle" : "XCircle"}
                  size={16}
                  className={
                    check?.passed ? "text-success" : "text-destructive"
                  }
                />
                <span className="text-sm font-medium text-foreground">
                  {check?.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    check?.passed
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {check?.passed ? "Passed" : "Failed"}
                </span>
                {check?.confidence && (
                  <span className="text-xs text-muted-foreground">
                    {check?.confidence}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Database Matching */}
        <div className="mb-6">
          <h5 className="font-medium text-foreground mb-3">
            Database Matching
          </h5>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">
                  Institution Match:
                </span>
                <span
                  className={`ml-2 font-medium ${
                    verificationData?.databaseMatch?.institution
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {verificationData?.databaseMatch?.institution
                    ? "Found"
                    : "Not Found"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Student Record:</span>
                <span
                  className={`ml-2 font-medium ${
                    verificationData?.databaseMatch?.student
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {verificationData?.databaseMatch?.student
                    ? "Verified"
                    : "No Match"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Certificate ID:</span>
                <span
                  className={`ml-2 font-medium ${
                    verificationData?.databaseMatch?.certificateId
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {verificationData?.databaseMatch?.certificateId
                    ? "Valid"
                    : "Invalid"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Digital Signature:
                </span>
                <span
                  className={`ml-2 font-medium ${
                    verificationData?.databaseMatch?.signature
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {verificationData?.databaseMatch?.signature
                    ? "Verified"
                    : "Legacy"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Verification */}
        {verificationData?.blockchainVerification && (
          <div className="mb-6">
            <h5 className="font-medium text-foreground mb-3">
              Blockchain Verification
            </h5>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Link" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Block Hash:{" "}
                  {verificationData?.blockchainVerification?.blockHash}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Verified on {verificationData?.blockchainVerification?.network}{" "}
                at block {verificationData?.blockchainVerification?.blockNumber}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={onGenerateReport}
            iconName="FileText"
            iconPosition="left"
          >
            Generate Report
          </Button>

          {verificationData?.status === "flagged" && (
            <Button
              variant="warning"
              onClick={onFlagForReview}
              iconName="Flag"
              iconPosition="left"
            >
              Flag for Review
            </Button>
          )}

          {verificationData?.status === "invalid" && (
            <Button
              variant="destructive"
              onClick={onAddToBlacklist}
              iconName="Ban"
              iconPosition="left"
            >
              Add to Blacklist
            </Button>
          )}

          <Button variant="outline">
            <Icon name="Share2" size={16} className="mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationResults;
