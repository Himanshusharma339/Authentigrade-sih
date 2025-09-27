import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const SecurityTab = () => {
  const [blacklistEntry, setBlacklistEntry] = useState("");
  const [selectedOffender, setSelectedOffender] = useState(null);

  const blacklistEntries = [
    {
      id: 1,
      name: "Avnish Kumar",
      email: "avnish.kumar@email.com",
      reason: "Multiple fake certificates submitted",
      dateAdded: "2024-09-10",
      attempts: 5,
      lastAttempt: "2024-09-14",
      status: "active",
    },
    {
      id: 2,
      name: "Manindar Singh",
      email: "manindar.s@email.com",
      reason: "Forged MIT degree certificate",
      dateAdded: "2024-09-08",
      attempts: 3,
      lastAttempt: "2024-09-12",
      status: "active",
    },
    {
      id: 3,
      name: "Akshat Jain",
      email: "akshat.j@email.com",
      reason: "Suspicious document formatting patterns",
      dateAdded: "2024-09-05",
      attempts: 7,
      lastAttempt: "2024-09-13",
      status: "under_review",
    },
  ];

  const suspiciousActivities = [
    {
      id: 1,
      type: "Multiple Login Attempts",
      description: "IP 192.168.1.100 attempted login 15 times in 5 minutes",
      severity: "high",
      timestamp: "2024-09-14 15:30:00",
      status: "investigating",
    },
    {
      id: 2,
      type: "Bulk Upload Anomaly",
      description:
        "University XYZ uploaded 500 certificates in unusual time pattern",
      severity: "medium",
      timestamp: "2024-09-14 14:45:00",
      status: "resolved",
    },
    {
      id: 3,
      type: "API Rate Limit Exceeded",
      description: "Third-party integration exceeded rate limits by 300%",
      severity: "low",
      timestamp: "2024-09-14 13:20:00",
      status: "monitoring",
    },
  ];

  const accessControls = [
    {
      role: "Super Admin",
      users: 2,
      permissions: "Full System Access",
      lastModified: "2024-09-10",
    },
    {
      role: "University Admin",
      users: 45,
      permissions: "Institution Management",
      lastModified: "2024-09-12",
    },
    {
      role: "Verification Officer",
      users: 128,
      permissions: "Certificate Verification",
      lastModified: "2024-09-13",
    },
    {
      role: "Student User",
      users: 2340,
      permissions: "Certificate Access",
      lastModified: "2024-09-14",
    },
  ];

  const handleAddToBlacklist = () => {
    if (blacklistEntry?.trim()) {
      console.log("Adding to blacklist:", blacklistEntry);
      setBlacklistEntry("");
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-destructive bg-destructive/10";
      case "under_review":
        return "text-warning bg-warning/10";
      case "resolved":
        return "text-success bg-success/10";
      case "investigating":
        return "text-accent bg-accent/10";
      case "monitoring":
        return "text-secondary bg-secondary/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Blacklist Management */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="UserX" size={20} className="text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Blacklist Management
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage offenders and suspicious users
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Input
              type="text"
              placeholder="Enter email or name to blacklist"
              value={blacklistEntry}
              onChange={(e) => setBlacklistEntry(e?.target?.value)}
              className="w-64"
            />
            <Button
              variant="destructive"
              onClick={handleAddToBlacklist}
              iconName="Plus"
              iconPosition="left"
            >
              Add to Blacklist
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  User
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Reason
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Attempts
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blacklistEntries?.map((entry) => (
                <tr
                  key={entry?.id}
                  className="border-b border-border hover:bg-muted/30 transition-smooth"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-foreground">
                        {entry?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry?.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-foreground">
                      {entry?.reason}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Added: {entry?.dateAdded}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-foreground">
                      {entry?.attempts}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last: {entry?.lastAttempt}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        entry?.status
                      )}`}
                    >
                      {entry?.status?.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suspicious Activity Monitoring */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 ">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Suspicious Activities
              </h3>
              <p className="text-sm text-muted-foreground">
                Recent security alerts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {suspiciousActivities?.map((activity) => (
              <div
                key={activity?.id}
                className="p-4 border border-border rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">
                    {activity?.type}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(
                        activity?.severity
                      )}`}
                    >
                      {activity?.severity}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        activity?.status
                      )}`}
                    >
                      {activity?.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  {activity?.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Control Settings */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Access Control
              </h3>
              <p className="text-sm text-muted-foreground">
                User roles and permissions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {accessControls?.map((control, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">
                    {control?.role}
                  </h4>
                  <span className="text-sm font-medium text-accent">
                    {control?.users} users
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {control?.permissions}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Modified: {control?.lastModified}
                  </span>
                  <Button variant="ghost" size="sm" iconName="Settings">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
