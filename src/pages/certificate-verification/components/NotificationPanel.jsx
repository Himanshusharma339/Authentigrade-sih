import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";

const NotificationPanel = ({ verificationData, onSendNotification }) => {
  const [notificationMethod, setNotificationMethod] = useState("email");
  const [recipients, setRecipients] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [includeReport, setIncludeReport] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(false);

  const handleSendNotification = () => {
    const notificationData = {
      method: notificationMethod,
      recipients: recipients?.split(",")?.map((r) => r?.trim()),
      message: customMessage,
      includeReport,
      includeDetails,
      verificationId: verificationData?.verificationId,
    };

    onSendNotification?.(notificationData);
  };

  const predefinedRecipients = [
    { label: "Student", value: "student@example.com", type: "student" },
    { label: "HR Department", value: "hr@company.com", type: "employer" },
    {
      label: "Institution Registrar",
      value: "registrar@university.edu",
      type: "institution",
    },
    {
      label: "Verification Team",
      value: "verify@AuthentiGrade.com",
      type: "internal",
    },
  ];

  const getStatusMessage = () => {
    switch (verificationData?.status) {
      case "verified":
        return `The certificate has been successfully verified and is authentic. All checks passed with a confidence score of ${verificationData?.overallConfidence}%.`;
      case "flagged":
        return `The certificate has been flagged for manual review due to inconsistencies. Please review the detailed analysis for more information.`;
      case "invalid":
        return `The certificate verification failed. The document appears to be fraudulent or does not match institutional records.`;
      default:
        return `Certificate verification is in progress. Results will be available shortly.`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg md:w-[110%] lg:w-[105%]">
      <div className="flex items-center space-x-3 p-4 border-b border-border">
        <Icon name="Send" size={20} className="text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">Send Notification</h3>
          <p className="text-sm text-muted-foreground">
            Share verification results with stakeholders
          </p>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Notification Method */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Notification Method
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setNotificationMethod("email")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                notificationMethod === "email"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name="Mail" size={16} />
              <span>Email</span>
            </button>
            <button
              onClick={() => setNotificationMethod("sms")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                notificationMethod === "sms"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name="MessageSquare" size={16} />
              <span>SMS</span>
            </button>
            <button
              onClick={() => setNotificationMethod("both")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                notificationMethod === "both"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name="Send" size={16} />
              <span>Both</span>
            </button>
          </div>
        </div>

        {/* Quick Recipients */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Quick Recipients
          </label>
          <div className="grid grid-cols-2 gap-2">
            {predefinedRecipients?.map((recipient, index) => (
              <button
                key={index}
                onClick={() => {
                  const currentRecipients = recipients
                    ? recipients?.split(",")?.map((r) => r?.trim())
                    : [];
                  if (!currentRecipients?.includes(recipient?.value)) {
                    setRecipients(
                      currentRecipients?.concat(recipient?.value)?.join(", ")
                    );
                  }
                }}
                className="flex items-center space-x-2 p-2 text-left border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <Icon
                  name={
                    recipient?.type === "student"
                      ? "GraduationCap"
                      : recipient?.type === "employer"
                      ? "Building"
                      : recipient?.type === "institution"
                      ? "School"
                      : "Users"
                  }
                  size={16}
                  className="text-primary"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {recipient?.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {recipient?.value}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recipients Input */}
        <div>
          <Input
            label={
              notificationMethod === "sms" || notificationMethod === "both"
                ? "Email/Phone Recipients"
                : "Email Recipients"
            }
            type="text"
            placeholder={
              notificationMethod === "sms" || notificationMethod === "both"
                ? "Enter emails or phone numbers, separated by commas"
                : "Enter email addresses, separated by commas"
            }
            value={recipients}
            onChange={(e) => setRecipients(e?.target?.value)}
            description={
              notificationMethod === "sms" || notificationMethod === "both"
                ? "Use format: email@domain.com, +1234567890"
                : "Separate multiple emails with commas"
            }
          />
        </div>

        {/* Message Preview */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Message Preview
          </label>
          <div className="p-4 bg-muted/30 rounded-lg border">
            <div className="text-sm text-foreground mb-2">
              <strong>Subject:</strong> Certificate Verification Results -{" "}
              {verificationData?.certificateId}
            </div>
            <div className="text-sm text-muted-foreground">
              {getStatusMessage()}
            </div>
          </div>
        </div>

        {/* Custom Message */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Additional Message (Optional)
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e?.target?.value)}
            placeholder="Add any additional context or instructions..."
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
          />
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground block">
            Include Attachments
          </label>

          <Checkbox
            label="Include verification report (PDF)"
            checked={includeReport}
            onChange={(e) => setIncludeReport(e?.target?.checked)}
            description="Attach a detailed PDF report with all verification results"
          />

          <Checkbox
            label="Include technical details"
            checked={includeDetails}
            onChange={(e) => setIncludeDetails(e?.target?.checked)}
            description="Include OCR analysis, database matching details, and technical metadata"
          />
        </div>

        {/* Send Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {recipients?.split(",")?.filter((r) => r?.trim())?.length} recipient
            {recipients?.split(",")?.filter((r) => r?.trim())?.length !== 1
              ? "s"
              : ""}{" "}
            selected
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Icon name="Eye" size={16} className="mr-2" />
              Preview
            </Button>
            <Button
              variant="default"
              onClick={handleSendNotification}
              disabled={!recipients?.trim()}
            >
              <Icon name="Send" size={16} className="mr-2" />
              Send Notification
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
