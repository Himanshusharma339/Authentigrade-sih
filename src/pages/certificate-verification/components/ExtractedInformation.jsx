import React from "react";
import Icon from "../../../components/AppIcon";

const ExtractedInformation = ({ extractedData }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-success bg-success/10";
    if (confidence >= 70) return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 90) return "CheckCircle";
    if (confidence >= 70) return "AlertTriangle";
    return "XCircle";
  };

  const informationFields = [
    {
      label: "Student Name",
      value: extractedData?.studentName,
      confidence: extractedData?.studentNameConfidence,
    },
    {
      label: "Roll Number",
      value: extractedData?.rollNumber,
      confidence: extractedData?.rollNumberConfidence,
    },
    {
      label: "Institution",
      value: extractedData?.institution,
      confidence: extractedData?.institutionConfidence,
    },
    {
      label: "Degree Program",
      value: extractedData?.degreeProgram,
      confidence: extractedData?.degreeProgramConfidence,
    },
    {
      label: "Certificate ID",
      value: extractedData?.certificateId,
      confidence: extractedData?.certificateIdConfidence,
    },
    {
      label: "Issue Date",
      value: extractedData?.issueDate,
      confidence: extractedData?.issueDateConfidence,
    },
    {
      label: "Grade/Marks",
      value: extractedData?.grade,
      confidence: extractedData?.gradeConfidence,
    },
    {
      label: "Graduation Year",
      value: extractedData?.graduationYear,
      confidence: extractedData?.graduationYearConfidence,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg md:w-[110%] lg:w-[105%]">
      <div className="flex items-center space-x-3 p-4 border-b border-border">
        <Icon name="FileText" size={20} className="text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">
            Extracted Information
          </h3>
          <p className="text-sm text-muted-foreground">
            OCR analysis completed with {extractedData?.overallConfidence}%
            accuracy
          </p>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {informationFields?.map((field, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-3 border-b border-border last:border-b-0"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {field?.label}
                </span>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(
                    field?.confidence
                  )}`}
                >
                  <Icon name={getConfidenceIcon(field?.confidence)} size={12} />
                  <span>{field?.confidence}%</span>
                </div>
              </div>
              <p className="text-foreground font-medium">
                {field?.value || "Not detected"}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Brain" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              OCR Analysis Summary
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Processing Time:</span>
              <span className="ml-2 font-medium text-foreground">
                {extractedData?.processingTime}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Text Regions:</span>
              <span className="ml-2 font-medium text-foreground">
                {extractedData?.textRegions}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Language:</span>
              <span className="ml-2 font-medium text-foreground">
                {extractedData?.language}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Quality Score:</span>
              <span className="ml-2 font-medium text-foreground">
                {extractedData?.qualityScore}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractedInformation;
