import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";

import CertificateImageViewer from "./components/CertificateImageViewer";
import ExtractedInformation from "./components/ExtractedInformation";
import VerificationResults from "./components/VerificationResults";
import MismatchDetection from "./components/MismatchDetection";
import VerificationHistory from "./components/VerificationHistory";
import NotificationPanel from "./components/NotificationPanel";
import AIVerificationAssistant from "./components/AIVerificationAssistant";

const CertificateVerification = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [aiReport, setAiReport] = useState(null);

  // Mock certificate data
  const certificateData = {
    fileName: "Degree_Certificate_img",
    fileSize: "2.4 MB",
    resolution: "2480x3508",
    format: "JPEG",
    originalImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=1000&fit=crop",
    processedImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=1000&fit=crop&brightness=1.1&contrast=1.2",
    ocrRegions: [
      { x: 20, y: 15, width: 60, height: 8, field: "Student Name" },
      { x: 20, y: 25, width: 40, height: 6, field: "Roll Number" },
      { x: 20, y: 35, width: 50, height: 6, field: "Institution" },
      { x: 20, y: 45, width: 45, height: 6, field: "Degree Program" },
    ],
  };

  // Mock extracted information
  const extractedData = {
    studentName: "Manoj Kumar",
    studentNameConfidence: 95,
    rollNumber: "CS2019001",
    rollNumberConfidence: 92,
    institution: "Prestige University",
    institutionConfidence: 98,
    degreeProgram: "Bachelor of Science in Computer Science",
    degreeProgramConfidence: 89,
    certificateId: "PRES-CS-2023-001",
    certificateIdConfidence: 87,
    issueDate: "June 15, 2023",
    issueDateConfidence: 94,
    grade: "Magna Cum Laude (GPA: 3.8/4.0)",
    gradeConfidence: 91,
    graduationYear: "2023",
    graduationYearConfidence: 96,
    overallConfidence: 93,
    processingTime: "2.3 seconds",
    textRegions: 24,
    language: "English",
    qualityScore: 9,
  };

  // Mock verification results
  const verificationData = {
    status: "verified",
    verificationId: "VER-2024-091401",
    completedAt: "September 14, 2024 at 3:42 PM",
    riskScore: 15,
    overallConfidence: 93,
    checks: [
      { name: "Institution Validation", passed: true, confidence: 98 },
      { name: "Student Record Match", passed: true, confidence: 95 },
      { name: "Certificate ID Verification", passed: true, confidence: 87 },
      { name: "Digital Signature Check", passed: true, confidence: 92 },
      { name: "Format Consistency", passed: true, confidence: 89 },
      { name: "Watermark Detection", passed: true, confidence: 94 },
    ],
    databaseMatch: {
      institution: true,
      student: true,
      certificateId: true,
      signature: true,
    },
    blockchainVerification: {
      blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      network: "Ethereum Mainnet",
      blockNumber: 18456789,
    },
  };

  // Mock mismatch data
  const mismatchData = [
    {
      id: 1,
      field: "Issue Date Format",
      severity: "medium",
      description: "Date format inconsistency detected",
      extractedValue: "June 15, 2023",
      expectedValue: "15/06/2023",
      analysis:
        "The extracted date uses a different format than the standard institutional format. This could indicate a formatting change or potential inconsistency.",
      confidence: 87,
      source: "OCR Analysis",
      recommendedActions: [
        "Verify with institution's current date format standards",
        "Check if format changed during the certificate issue period",
        "Cross-reference with other certificates from the same period",
      ],
    },
  ];

  // Mock history data
  const historyData = [
    {
      action: "Certificate Uploaded",
      description: "Certificate image uploaded for verification",
      timestamp: "2024-09-14 15:40:12",
      user: "admin@certifyguard.com",
      ipAddress: "192.168.1.100",
      status: "completed",
    },
    {
      action: "OCR Processing Started",
      description: "Optical Character Recognition analysis initiated",
      timestamp: "2024-09-14 15:40:15",
      user: "system",
      ipAddress: "internal",
      status: "completed",
    },
    {
      action: "Database Verification",
      description: "Cross-referencing with institutional database",
      timestamp: "2024-09-14 15:40:18",
      user: "system",
      ipAddress: "internal",
      status: "completed",
      verificationId: "VER-2024-091401",
    },
  ];

  // Mock similar certificates
  const similarCertificates = [
    {
      studentName: "Krishna Pal",
      institution: "Prestige University",
      year: "2023",
      certificateId: "PRES-CS-2023-002",
      similarity: 94,
      riskLevel: "low",
      status: "verified",
      lastVerified: "2024-09-10",
    },
    {
      studentName: "Meena Kumari",
      institution: "Prestige University",
      year: "2023",
      certificateId: "PRES-CS-2023-003",
      similarity: 89,
      riskLevel: "low",
      status: "verified",
      lastVerified: "2024-09-08",
    },
  ];

  // Mock fraud alerts
  const fraudAlerts = [];

  const handleGenerateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Mock report generation
      console.log("Generating verification report...");
    }, 2000);
  };

  const handleFlagForReview = () => {
    console.log("Flagging certificate for manual review...");
  };

  const handleAddToBlacklist = () => {
    console.log("Adding certificate to blacklist...");
  };

  const handleSendNotification = (notificationData) => {
    console.log("Sending notification:", notificationData);
  };

  const handleResolveMismatch = (mismatchId) => {
    console.log("Resolving mismatch:", mismatchId);
  };

  const handleIgnoreMismatch = (mismatchId) => {
    console.log("Ignoring mismatch:", mismatchId);
  };

  const handleAIReportGenerated = (report) => {
    setAiReport(report);
    // You can integrate this with your verification process
    console.log("AI Report generated:", report);
  };

  const sections = [
    { id: "overview", label: "Overview", icon: "Eye" },
    { id: "analysis", label: "Analysis", icon: "Search" },
    { id: "history", label: "History", icon: "Clock" },
    { id: "notifications", label: "Notifications", icon: "Send" },
  ];

  return (
    <div className="min-h-screen bg-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Image and Basic Info */}
          <div className="xl:col-span-1 space-y-6 ">
            <CertificateImageViewer
              certificate={certificateData}
              onZoomChange={(zoom) => console.log("Zoom changed:", zoom)}
            />
            <ExtractedInformation
              certificate={certificateData}
              extractedData={extractedData}
            />
          </div>

          {/* Middle Column - Verification Results and AI Assistant */}
          <div className="xl:col-span-1 space-y-6">
            <VerificationResults
              verificationData={verificationData}
              onGenerateReport={handleGenerateReport}
              onFlagForReview={handleFlagForReview}
              onAddToBlacklist={handleAddToBlacklist}
            />

            {/* AI Verification Assistant */}
            <AIVerificationAssistant
              certificateData={certificateData}
              onReportGenerated={handleAIReportGenerated}
            />
          </div>

          {/* Right Column - History and Detection */}
          <div className="xl:col-span-1 space-y-6">
            <MismatchDetection
              mismatches={mismatchData}
              onResolve={handleResolveMismatch}
              onIgnore={handleIgnoreMismatch}
            />

            <VerificationHistory
              history={historyData}
              similarCertificates={similarCertificates}
              fraudAlerts={fraudAlerts}
            />

            <NotificationPanel
              verificationData={verificationData}
              onSendNotification={handleSendNotification}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificateVerification;
