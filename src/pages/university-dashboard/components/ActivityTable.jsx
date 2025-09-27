import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ActivityTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const activities = [
    {
      id: 1,
      studentName: "Bahadur Singh",
      certificateType: "Bachelor of Science",
      verificationStatus: "verified",
      requestedBy: "TechCorp Inc.",
      timestamp: "2025-09-13 14:30:22",
      certificateId: "BSC2024001",
    },
    {
      id: 2,
      studentName: "Shivani Gupta",
      certificateType: "Master of Engineering",
      verificationStatus: "pending",
      requestedBy: "Innovation Labs",
      timestamp: "2025-09-14 13:45:18",
      certificateId: "MEG2024002",
    },
    {
      id: 3,
      studentName: "Ajaz Patel",
      certificateType: "Bachelor of Arts",
      verificationStatus: "flagged",
      requestedBy: "Creative Agency",
      timestamp: "2025-09-14 12:20:45",
      certificateId: "BA2024003",
    },
    {
      id: 4,
      studentName: "Kartik Kalal",
      certificateType: "PhD Computer Science",
      verificationStatus: "verified",
      requestedBy: "Research Institute",
      timestamp: "2025-09-15 11:15:30",
      certificateId: "PHD2024004",
    },
    {
      id: 5,
      studentName: "Harpal Singh Sokhi",
      certificateType: "Master of Business",
      verificationStatus: "rejected",
      requestedBy: "Global Corp",
      timestamp: "2025-09-16 10:30:12",
      certificateId: "MBA2024005",
    },
    {
      id: 6,
      studentName: "Meena Patidar",
      certificateType: "Bachelor of Engineering",
      verificationStatus: "verified",
      requestedBy: "Tech Solutions",
      timestamp: "2025-09-17 09:45:28",
      certificateId: "BE2024006",
    },
    {
      id: 7,
      studentName: "Prince Jadhav",
      certificateType: "Master of Science",
      verificationStatus: "pending",
      requestedBy: "BioTech Labs",
      timestamp: "2025-09-17 08:20:15",
      certificateId: "MSC2024007",
    },
    {
      id: 8,
      studentName: "Monica Nagae",
      certificateType: "Bachelor of Commerce",
      verificationStatus: "verified",
      requestedBy: "Finance Corp",
      timestamp: "2025-09-18 16:30:40",
      certificateId: "BCOM2024008",
    },
  ];

  const getStatusBadge = (status) => {
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
      flagged: {
        color: "bg-error text-error-foreground",
        icon: "AlertTriangle",
        label: "Flagged",
      },
      rejected: {
        color: "bg-destructive text-destructive-foreground",
        icon: "XCircle",
        label: "Rejected",
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

  const totalPages = Math.ceil(activities?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities?.slice(startIndex, endIndex);

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 w-[150%]">
      <div className="p-6 border-b border-border ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Recent Verification Activities
            </h3>
            <p className="text-sm text-muted-foreground">
              Latest certificate verification requests and status updates
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Student
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Certificate
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Requested By
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Date & Time
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentActivities?.map((activity) => (
              <tr
                key={activity?.id}
                className="border-b border-border hover:bg-muted/50 transition-smooth"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {activity?.studentName
                          ?.split(" ")
                          ?.map((n) => n?.[0])
                          ?.join("")}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {activity?.studentName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity?.certificateId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-foreground">
                    {activity?.certificateType}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(activity?.verificationStatus)}
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-foreground">
                    {activity?.requestedBy}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-foreground">
                    {activity?.timestamp}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                    ></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, activities?.length)}{" "}
          of {activities?.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(
              (page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              )
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            iconName="ChevronRight"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;
