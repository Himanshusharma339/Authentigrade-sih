import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const InstitutionProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    institutionName: "Stanford University",
    establishedYear: "1885",
    accreditation: "WASC Senior College and University Commission",
    address: "450 Serra Mall, Stanford, CA 94305",
    phone: "+1 (650) 723-2300",
    email: "registrar@stanford.edu",
    website: "https://www.stanford.edu",
    description: `Stanford University is a private research university in Stanford, California. The campus occupies 8,180 acres, among the largest in the United States, and enrolls over 17,000 students.`,
  });

  const verificationBadges = [
    {
      id: 1,
      name: "WASC Accredited",
      type: "accreditation",
      status: "verified",
      issuedDate: "2023-01-15",
      expiryDate: "2028-01-15",
    },
    {
      id: 2,
      name: "Government Recognized",
      type: "government",
      status: "verified",
      issuedDate: "2022-06-20",
      expiryDate: "2027-06-20",
    },
    {
      id: 3,
      name: "ISO 21001 Certified",
      type: "quality",
      status: "pending",
      issuedDate: null,
      expiryDate: null,
    },
  ];

  const certificateTemplates = [
    {
      id: 1,
      name: "Bachelor's Degree Template",
      type: "undergraduate",
      lastUpdated: "2025-01-10",
      status: "active",
      usage: 1250,
    },
    {
      id: 2,
      name: "Master's Degree Template",
      type: "graduate",
      lastUpdated: "2025-01-08",
      status: "active",
      usage: 850,
    },
    {
      id: 3,
      name: "PhD Certificate Template",
      type: "doctoral",
      lastUpdated: "2024-12-15",
      status: "active",
      usage: 120,
    },
    {
      id: 4,
      name: "Diploma Template",
      type: "diploma",
      lastUpdated: "2024-11-20",
      status: "inactive",
      usage: 0,
    },
  ];

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getBadgeStatus = (status) => {
    const statusConfig = {
      verified: {
        color: "bg-success text-success-foreground",
        icon: "CheckCircle",
        label: "Verified",
      },
      pending: {
        color: "bg-warning text-warning-foreground",
        icon: "Clock",
        label: "Pending",
      },
      expired: {
        color: "bg-error text-error-foreground",
        icon: "XCircle",
        label: "Expired",
      },
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}
      >
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  const getTemplateStatus = (status) => {
    return status === "active" ? (
      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
        <Icon name="CheckCircle" size={12} />
        <span>Active</span>
      </span>
    ) : (
      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
        <Icon name="Pause" size={12} />
        <span>Inactive</span>
      </span>
    );
  };

  return (
    <div className="space-y-4 w-full md:w-[90%] lg:w-[85%]">
      {/* Institution Details */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Institution Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your institution's profile information
              </p>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              iconName={isEditing ? "Save" : "Edit"}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6 mb-6">
            <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Building" size={48} className="text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Institution Name"
                  value={profileData?.institutionName}
                  onChange={(e) =>
                    handleInputChange("institutionName", e?.target?.value)
                  }
                  disabled={!isEditing}
                />
                <Input
                  label="Established Year"
                  value={profileData?.establishedYear}
                  onChange={(e) =>
                    handleInputChange("establishedYear", e?.target?.value)
                  }
                  disabled={!isEditing}
                />
                <Input
                  label="Accreditation"
                  value={profileData?.accreditation}
                  onChange={(e) =>
                    handleInputChange("accreditation", e?.target?.value)
                  }
                  disabled={!isEditing}
                  className="md:col-span-2"
                />
                <Input
                  label="Address"
                  value={profileData?.address}
                  onChange={(e) =>
                    handleInputChange("address", e?.target?.value)
                  }
                  disabled={!isEditing}
                  className="md:col-span-2"
                />
                <Input
                  label="Phone"
                  value={profileData?.phone}
                  onChange={(e) => handleInputChange("phone", e?.target?.value)}
                  disabled={!isEditing}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData?.email}
                  onChange={(e) => handleInputChange("email", e?.target?.value)}
                  disabled={!isEditing}
                />
                <Input
                  label="Website"
                  value={profileData?.website}
                  onChange={(e) =>
                    handleInputChange("website", e?.target?.value)
                  }
                  disabled={!isEditing}
                  className="md:col-span-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Verification Badges */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Verification Badges
              </h3>
              <p className="text-sm text-muted-foreground">
                Your institution's accreditation and verification status
              </p>
            </div>
            <Button variant="outline" iconName="Plus">
              Request Badge
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verificationBadges?.map((badge) => (
              <div
                key={badge?.id}
                className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Award" size={20} className="text-primary" />
                  </div>
                  {getBadgeStatus(badge?.status)}
                </div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {badge?.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 capitalize">
                  {badge?.type} verification
                </p>
                {badge?.issuedDate && (
                  <div className="text-xs text-muted-foreground">
                    <p>Issued: {badge?.issuedDate}</p>
                    <p>Expires: {badge?.expiryDate}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Certificate Templates */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Certificate Templates
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage certificate formats and templates
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" iconName="Upload">
                Upload Template
              </Button>
              <Button variant="default" iconName="Plus">
                Create Template
              </Button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {certificateTemplates?.map((template) => (
            <div
              key={template?.id}
              className="p-6 hover:bg-muted/30 transition-smooth"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {template?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {template?.type} certificate
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {template?.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-foreground">
                      {template?.usage} certificates
                    </div>
                    <div className="text-xs text-muted-foreground">
                      issued using this template
                    </div>
                  </div>
                  {getTemplateStatus(template?.status)}
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstitutionProfile;
