import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const ReportTable = ({ data, onExport }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRows, setSelectedRows] = useState([]);

  const mockData = [
    {
      id: "CERT-2024-001",
      studentName: "Mukesh Kumar",
      institution: "Prestige University",
      certificateType: "Bachelor of Science",
      verificationStatus: "verified",
      timestamp: "2024-09-14 13:30:15",
      processingTime: "2.3 hours",
      verifiedBy: "System Auto",
    },
    {
      id: "CERT-2024-002",
      studentName: "Harsh Paudwal",
      institution: "MIT",
      certificateType: "Master of Engineering",
      verificationStatus: "rejected",
      timestamp: "2024-09-14 12:15:42",
      processingTime: "1.8 hours",
      verifiedBy: "Admin Review",
    },
    {
      id: "CERT-2024-003",
      studentName: "Nakul Sharma",
      institution: "Indira Gandhi National Tribal University",
      certificateType: "PhD in Computer Science",
      verificationStatus: "pending",
      timestamp: "2024-09-14 11:45:28",
      processingTime: "3.2 hours",
      verifiedBy: "Pending Review",
    },
    {
      id: "CERT-2024-004",
      studentName: "Meena Yadav",
      institution: "Medicaps University",
      certificateType: "Bachelor of Arts",
      verificationStatus: "verified",
      timestamp: "2024-09-14 10:20:11",
      processingTime: "1.5 hours",
      verifiedBy: "System Auto",
    },
    {
      id: "CERT-2024-005",
      studentName: "Mohammad Raja",
      institution: "Thapar Institute of Engineering and Technology",
      certificateType: "Master of Science",
      verificationStatus: "flagged",
      timestamp: "2024-09-14 09:35:57",
      processingTime: "4.1 hours",
      verifiedBy: "Manual Review",
    },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev?.includes(id) ? prev?.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows?.length === mockData?.length
        ? []
        : mockData?.map((row) => row?.id)
    );
  };

  const filteredData = mockData?.filter(
    (row) =>
      row?.studentName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      row?.institution?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      row?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;

    if (typeof aValue === "string") {
      return aValue?.localeCompare(bValue) * direction;
    }
    return (aValue - bValue) * direction;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: {
        bg: "bg-success/10",
        text: "text-success",
        icon: "CheckCircle",
      },
      rejected: {
        bg: "bg-destructive/10",
        text: "text-destructive",
        icon: "XCircle",
      },
      pending: { bg: "bg-warning/10", text: "text-warning", icon: "Clock" },
      flagged: { bg: "bg-error/10", text: "text-error", icon: "AlertTriangle" },
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}
      >
        <Icon name={config?.icon} size={12} />
        <span>{status?.charAt(0)?.toUpperCase() + status?.slice(1)}</span>
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Table" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Verification Records
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedRows?.length > 0
                ? `${selectedRows?.length} selected`
                : `${sortedData?.length} total records`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() =>
              onExport(
                selectedRows?.length > 0
                  ? selectedRows
                  : sortedData?.map((row) => row?.id)
              )
            }
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === mockData?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: "id", label: "Certificate ID" },
                { key: "studentName", label: "Student Name" },
                { key: "institution", label: "Institution" },
                { key: "certificateType", label: "Certificate Type" },
                { key: "verificationStatus", label: "Status" },
                { key: "timestamp", label: "Timestamp" },
                { key: "processingTime", label: "Processing Time" },
                { key: "verifiedBy", label: "Verified By" },
              ]?.map((column) => (
                <th key={column?.key} className="text-left p-3">
                  <button
                    onClick={() => handleSort(column?.key)}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>{column?.label}</span>
                    <Icon
                      name={
                        sortField === column?.key
                          ? sortDirection === "asc"
                            ? "ChevronUp"
                            : "ChevronDown"
                          : "ChevronsUpDown"
                      }
                      size={14}
                    />
                  </button>
                </th>
              ))}
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((row) => (
              <tr
                key={row?.id}
                className="border-b border-border hover:bg-muted/30 transition-smooth"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(row?.id)}
                    onChange={() => handleRowSelect(row?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <span className="font-mono text-sm text-primary">
                    {row?.id}
                  </span>
                </td>
                <td className="p-3">
                  <span className="font-medium text-foreground">
                    {row?.studentName}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">
                    {row?.institution}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-foreground">
                    {row?.certificateType}
                  </span>
                </td>
                <td className="p-3">
                  {getStatusBadge(row?.verificationStatus)}
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">
                    {row?.timestamp}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">
                    {row?.processingTime}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm text-muted-foreground">
                    {row?.verifiedBy}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Download">
                      Export
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedData?.length === 0 && (
        <div className="text-center py-12">
          <Icon
            name="Search"
            size={48}
            color="var(--color-muted-foreground)"
            className="mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No records found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportTable;
