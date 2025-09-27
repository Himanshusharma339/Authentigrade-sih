import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const CertificateCard = ({ certificate, onView, onShare, onDownload }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return "CheckCircle";
      case "pending":
        return "Clock";
      case "rejected":
        return "XCircle";
      default:
        return "AlertCircle";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth overflow-hidden">
      {/* Certificate Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={certificate?.institutionLogo}
                alt={certificate?.institution}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg leading-tight">
                {certificate?.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {certificate?.institution}
              </p>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
              certificate?.status
            )}`}
          >
            <Icon name={getStatusIcon(certificate?.status)} size={12} />
            <span className="capitalize">{certificate?.status}</span>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Certificate Type
            </p>
            <p className="text-sm font-medium text-foreground">
              {certificate?.type}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Issue Date
            </p>
            <p className="text-sm font-medium text-foreground">
              {certificate?.issueDate}
            </p>
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Certificate ID
                </p>
                <p className="text-sm font-medium text-foreground font-mono">
                  {certificate?.certificateId}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Grade/Score
                </p>
                <p className="text-sm font-medium text-foreground">
                  {certificate?.grade}
                </p>
              </div>
            </div>

            {certificate?.expiryDate && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Expiry Date
                </p>
                <p className="text-sm font-medium text-foreground">
                  {certificate?.expiryDate}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Verification Details
              </p>
              <p className="text-sm text-foreground">
                {certificate?.verificationDetails}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* QR Code Section */}
      {certificate?.status === "verified" && (
        <div className="px-6 pb-4">
          <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded border-2 border-border flex items-center justify-center">
                <Icon name="QrCode" size={24} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  QR Verification
                </p>
                <p className="text-xs text-muted-foreground">
                  Instant verification available
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(certificate)}
            >
              <Icon name="Eye" size={16} />
            </Button>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="px-6 pb-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            <span>{isExpanded ? "Less" : "Details"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(certificate)}
            disabled={certificate?.status !== "verified"}
          >
            <Icon name="Share2" size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(certificate)}
            disabled={certificate?.status !== "verified"}
          >
            <Icon name="Download" size={16} />
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => onView(certificate)}
          >
            <Icon name="Eye" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
