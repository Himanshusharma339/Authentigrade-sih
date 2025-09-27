import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import UploadZone from "./components/UploadZone";
import ProcessingQueue from "./components/ProcessingQueue";
import UploadGuidelines from "./components/UploadGuidelines";
import ProcessingStats from "./components/ProcessingStats";
import AIAnalysisPanel from "./components/AIAnalysisPanel";

import Button from "../../components/ui/Button";

const CertificateUpload = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // Mock data for demonstration
  const mockExtractedData = [
    {
      studentName: "Avnish Kumar",
      institution: "IGNTU",
      certificateId: "IGNTU-2023-CS-4567",
      grade: "Bachelor of Science in Computer Science",
      issueDate: "May 15, 2023",
    },
    {
      studentName: "Abdul Khan",
      institution: "BHU",
      certificateId: "BHU-2023-EE-8901",
      grade: "Master of Engineering in Electrical Engineering",
      issueDate: "June 10, 2023",
    },
    {
      studentName: "Khushi Bhanupriya",
      institution: "MIT",
      certificateId: "MIT-2023-MBA-2345",
      grade: "Master of Business Administration",
      issueDate: "May 25, 2023",
    },
  ];

  const generateFileId = () => {
    return Date.now() + Math.random()?.toString(36)?.substr(2, 9);
  };

  // Add missing function declarations
  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleAnalysisComplete = (analysis) => {
    setAiAnalysis(analysis);
  };

  // Add stats calculation
  const stats = {
    total: files.length,
    pending: files.filter((f) => f.status === "pending").length,
    processing: files.filter((f) => f.status === "processing").length,
    completed: files.filter((f) => f.status === "completed").length,
    failed: files.filter((f) => f.status === "failed").length,
  };

  const handleFilesSelected = (selectedFiles) => {
    const newFiles = selectedFiles?.map((file) => ({
      id: generateFileId(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      status: "pending",
      progress: 0,
      file: file,
      extractedData: null,
      confidence: null,
      error: null,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((prev) => prev?.filter((file) => file?.id !== fileId));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const simulateProcessing = async (fileId, mockData) => {
    // Update to processing
    setFiles((prev) =>
      prev?.map((file) =>
        file?.id === fileId
          ? { ...file, status: "processing", progress: 10 }
          : file
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update to extracting
    setFiles((prev) =>
      prev?.map((file) =>
        file?.id === fileId
          ? { ...file, status: "extracting", progress: 40 }
          : file
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Update to verifying with extracted data
    setFiles((prev) =>
      prev?.map((file) =>
        file?.id === fileId
          ? {
              ...file,
              status: "verifying",
              progress: 70,
              extractedData: mockData,
              confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
            }
          : file
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Complete processing
    const isSuccess = Math.random() > 0.1; // 90% success rate
    setFiles((prev) =>
      prev?.map((file) =>
        file?.id === fileId
          ? {
              ...file,
              status: isSuccess ? "completed" : "failed",
              progress: 100,
              error: isSuccess
                ? null
                : "Unable to verify certificate authenticity. Please check document quality and try again.",
            }
          : file
      )
    );
  };

  const handleStartProcessing = async () => {
    setIsProcessing(true);

    const pendingFiles = files?.filter((file) => file?.status === "pending");

    // Process files sequentially with mock data
    for (let i = 0; i < pendingFiles?.length; i++) {
      const file = pendingFiles?.[i];
      const mockData = mockExtractedData?.[i % mockExtractedData?.length];
      await simulateProcessing(file?.id, mockData);
    }

    setIsProcessing(false);
  };

  // Auto-scroll to processing queue when files are added
  useEffect(() => {
    if (files?.length > 0) {
      const queueElement = document.getElementById("processing-queue");
      if (queueElement) {
        queueElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [files?.length]);

  return (
    <div className="min-h-screen bg-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Upload Area */}
            <UploadZone
              onFilesSelected={handleFilesSelected}
              isProcessing={isProcessing}
              onFileUpload={handleFileUpload}
            />

            {/* AI Analysis Panel */}
            <AIAnalysisPanel
              uploadedFile={uploadedFile}
              onAnalysisComplete={handleAnalysisComplete}
            />

            <ProcessingStats files={files} />

            <div id="processing-queue">
              <ProcessingQueue
                files={files}
                onRemoveFile={handleRemoveFile}
                onClearAll={handleClearAll}
                onStartProcessing={handleStartProcessing}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* ... keep existing ProcessingStats ... */}
            <ProcessingStats files={files} />

            {/* ... keep existing UploadGuidelines ... */}
            <UploadGuidelines />
          </div>
        </div>

        {/* Quick Actions */}
        {files?.length > 0 && (
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Quick Actions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage your uploaded documents and processing workflow
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Save"
                  iconPosition="left"
                  disabled={files?.length === 0}
                >
                  Save Draft
                </Button>

                <Button
                  variant="secondary"
                  iconName="Download"
                  iconPosition="left"
                  disabled={
                    files?.filter((f) => f?.status === "completed")?.length ===
                    0
                  }
                >
                  Export Results
                </Button>

                <Button
                  variant="default"
                  iconName="Eye"
                  iconPosition="left"
                  disabled={
                    files?.filter((f) => f?.status === "completed")?.length ===
                    0
                  }
                >
                  View Reports
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CertificateUpload;
