import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import CertificateCard from "./components/CertificateCard";
import StatisticsPanel from "./components/StatisticsPanel";
import FilterPanel from "./components/FilterPanel";
import ShareModal from "./components/ShareModal";

const StudentDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    institution: "all",
    type: "all",
    status: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    certificate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockCertificates = [
    {
      id: 1,
      title: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      institutionLogo:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      type: "degree",
      status: "verified",
      issueDate: "May 15, 2023",
      expiryDate: null,
      certificateId: "STAN-CS-2023-001234",
      grade: "3.8 GPA",
      verificationDetails: `Verified through Stanford University's official registry on September 12, 2024.\nBlockchain verification completed with hash: 0x1a2b3c4d5e6f7890abcdef1234567890`,
    },
    {
      id: 2,
      title: "Machine Learning Specialization",
      institution: "MIT",
      institutionLogo:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop&crop=center",
      type: "certificate",
      status: "verified",
      issueDate: "August 22, 2023",
      expiryDate: "August 22, 2026",
      certificateId: "MIT-ML-2023-005678",
      grade: "95%",
      verificationDetails: `Certificate verified through MIT's digital credential system.\nIssued by: Dr. Andrew Ng\nVerification completed on September 10, 2024`,
    },
    {
      id: 3,
      title: "Data Science Bootcamp",
      institution: "UC Berkeley",
      institutionLogo:
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop&crop=center",
      type: "certificate",
      status: "pending",
      issueDate: "September 5, 2024",
      expiryDate: null,
      certificateId: "UCB-DS-2024-009876",
      grade: "A+",
      verificationDetails:
        "Verification in progress. Expected completion by September 20, 2024.",
    },
    {
      id: 4,
      title: "Master of Business Administration",
      institution: "Harvard University",
      institutionLogo:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=100&h=100&fit=crop&crop=center",
      type: "degree",
      status: "verified",
      issueDate: "June 10, 2022",
      expiryDate: null,
      certificateId: "HBS-MBA-2022-001122",
      grade: "Magna Cum Laude",
      verificationDetails: `Verified through Harvard Business School registrar.\nDegree conferred by Harvard University Board of Overseers.\nVerification date: September 8, 2024`,
    },
    {
      id: 5,
      title: "Python Programming Certificate",
      institution: "Caltech",
      institutionLogo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
      type: "certificate",
      status: "rejected",
      issueDate: "July 18, 2024",
      expiryDate: "July 18, 2027",
      certificateId: "CALTECH-PY-2024-003344",
      grade: "88%",
      verificationDetails:
        "Verification failed due to certificate format inconsistencies. Please resubmit with original document.",
    },
  ];

  const mockStatistics = {
    totalCertificates: 5,
    verifiedCertificates: 3,
    pendingCertificates: 1,
    sharedThisMonth: 12,
    recentActivity: [
      {
        description: "MIT Certificate shared with TechCorp",
        timestamp: "2 hours ago",
        icon: "Share2",
        color: "text-accent",
        bgColor: "bg-accent/10",
      },
      {
        description: "Stanford Degree verification completed",
        timestamp: "1 day ago",
        icon: "CheckCircle",
        color: "text-success",
        bgColor: "bg-success/10",
      },
      {
        description: "Data Science Certificate uploaded",
        timestamp: "3 days ago",
        icon: "Upload",
        color: "text-primary",
        bgColor: "bg-primary/10",
      },
    ],
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCertificates(mockCertificates);
      setFilteredCertificates(mockCertificates);
      setStatistics(mockStatistics);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter certificates based on current filters
    let filtered = certificates;

    if (filters?.search) {
      filtered = filtered?.filter(
        (cert) =>
          cert?.title
            ?.toLowerCase()
            ?.includes(filters?.search?.toLowerCase()) ||
          cert?.institution
            ?.toLowerCase()
            ?.includes(filters?.search?.toLowerCase()) ||
          cert?.certificateId
            ?.toLowerCase()
            ?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.institution !== "all") {
      filtered = filtered?.filter((cert) =>
        cert?.institution
          ?.toLowerCase()
          ?.includes(filters?.institution?.toLowerCase())
      );
    }

    if (filters?.type !== "all") {
      filtered = filtered?.filter((cert) => cert?.type === filters?.type);
    }

    if (filters?.status !== "all") {
      filtered = filtered?.filter((cert) => cert?.status === filters?.status);
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter(
        (cert) => new Date(cert.issueDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(
        (cert) => new Date(cert.issueDate) <= new Date(filters.dateTo)
      );
    }

    setFilteredCertificates(filtered);
  }, [filters, certificates]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      institution: "all",
      type: "all",
      status: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleViewCertificate = (certificate) => {
    console.log("Viewing certificate:", certificate);
    // Navigate to certificate detail view
  };

  const handleShareCertificate = (certificate) => {
    setShareModal({
      isOpen: true,
      certificate,
    });
  };

  const handleDownloadCertificate = (certificate) => {
    console.log("Downloading certificate:", certificate);
    // Implement download functionality
  };

  const handleShare = (shareData) => {
    console.log("Sharing certificate:", shareData);
    // Implement share functionality
  };

  const handleRequestVerification = () => {
    console.log("Requesting verification for new certificate");
    // Navigate to upload page
  };

  const handleSharePortfolio = () => {
    console.log("Sharing entire portfolio");
    // Implement portfolio sharing
  };

  const handleDownloadReport = () => {
    console.log("Downloading comprehensive report");
    // Implement report download
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Loading your certificates...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-indigo-100">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  My Certificate Portfolio
                </h1>
                <p className="text-muted-foreground">
                  Manage and share your verified academic credentials securely
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={handleSharePortfolio}>
                  <Icon name="Share2" size={18} />
                  <span>Share Portfolio</span>
                </Button>

                <Button variant="outline" onClick={handleDownloadReport}>
                  <Icon name="Download" size={18} />
                  <span>Download Report</span>
                </Button>

                <Link to="/certificate-upload">
                  <Button onClick={handleRequestVerification}>
                    <Icon name="Plus" size={18} />
                    <span>Request Verification</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <StatisticsPanel statistics={statistics} />
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Certificates ({filteredCertificates?.length})
                  </h2>

                  {filteredCertificates?.length !== certificates?.length && (
                    <span className="text-sm text-muted-foreground">
                      Filtered from {certificates?.length} total
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Grid3X3" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="List" size={16} />
                  </Button>
                </div>
              </div>

              {/* Certificates Grid */}
              {filteredCertificates?.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredCertificates?.map((certificate) => (
                    <CertificateCard
                      key={certificate?.id}
                      certificate={certificate}
                      onView={handleViewCertificate}
                      onShare={handleShareCertificate}
                      onDownload={handleDownloadCertificate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name="FileX"
                      size={32}
                      className="text-muted-foreground"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No certificates found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or upload a new certificate
                  </p>
                  <Link to="/certificate-upload">
                    <Button>
                      <Icon name="Plus" size={18} />
                      <span>Upload Certificate</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Share Modal */}
      <ShareModal
        certificate={shareModal?.certificate}
        isOpen={shareModal?.isOpen}
        onClose={() => setShareModal({ isOpen: false, certificate: null })}
        onShare={handleShare}
      />
    </div>
  );
};

export default StudentDashboard;
