import React from "react";
import Icon from "../../../components/AppIcon";

const UploadGuidelines = () => {
  const guidelines = [
    {
      icon: "FileText",
      title: "Supported Formats",
      description: "PDF, JPG, PNG files up to 10MB each",
      tips: [
        "High-resolution scans preferred",
        "Avoid blurry or dark images",
        "Ensure text is clearly readable",
      ],
    },
    {
      icon: "Shield",
      title: "Certificate Types",
      description: "Academic certificates and diplomas",
      tips: [
        "Degree certificates",
        "Diploma certificates",
        "Course completion certificates",
        "Transcripts and mark sheets",
      ],
    },
    {
      icon: "Eye",
      title: "Quality Requirements",
      description: "Clear, well-lit document images",
      tips: [
        "Minimum 300 DPI resolution",
        "Full document visible in frame",
        "No shadows or reflections",
        "Straight orientation preferred",
      ],
    },
    {
      icon: "Zap",
      title: "Processing Time",
      description: "Typical verification takes 2-5 minutes",
      tips: [
        "OCR extraction: 30-60 seconds",
        "Database matching: 1-2 minutes",
        "Blockchain verification: 2-3 minutes",
        "Final report generation: 30 seconds",
      ],
    },
  ];

  const supportedInstitutions = [
    "Universities and Colleges",
    "Technical Institutes",
    "Professional Certification Bodies",
    "Government Education Boards",
    "International Institutions",
    "Online Learning Platforms",
  ];

  return (
    <div className="space-y-6 mt-14">
      <div className="bg-card rounded-lg border border-border p-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Info" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Upload Guidelines
            </h3>
            <p className="text-sm text-muted-foreground">
              Follow these guidelines for optimal results
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {guidelines?.map((guideline, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={guideline?.icon}
                    size={16}
                    className="text-muted-foreground"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {guideline?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {guideline?.description}
                  </p>

                  <ul className="space-y-1">
                    {guideline?.tips?.map((tip, tipIndex) => (
                      <li
                        key={tipIndex}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Icon
                          name="Check"
                          size={12}
                          className="text-success flex-shrink-0"
                        />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Supported Institutions
            </h3>
            <p className="text-sm text-muted-foreground">
              We verify certificates from these institution types
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {supportedInstitutions?.map((institution, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <Icon
                name="Building2"
                size={14}
                className="text-muted-foreground flex-shrink-0"
              />
              <span>{institution}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 bg-white">
        <div className="flex items-start gap-3">
          <Icon
            name="AlertTriangle"
            size={20}
            className="text-warning flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Important Notice
            </h4>
            <p className="text-sm text-muted-foreground">
              Ensure all personal information is clearly visible and matches
              official records. Tampered or fraudulent documents will be flagged
              and reported to relevant authorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadGuidelines;
