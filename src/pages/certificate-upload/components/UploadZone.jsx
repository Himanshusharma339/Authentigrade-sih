import React, { useState, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const UploadZone = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    const validFiles = files?.filter(
      (file) =>
        ["application/pdf", "image/jpeg", "image/jpg", "image/png"]?.includes(
          file?.type
        ) && file?.size <= 10 * 1024 * 1024 // 10MB limit
    );
    if (validFiles?.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    const validFiles = files?.filter(
      (file) =>
        ["application/pdf", "image/jpeg", "image/jpg", "image/png"]?.includes(
          file?.type
        ) && file?.size <= 10 * 1024 * 1024
    );
    if (validFiles?.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border-2 border-dashed border-border p-8 mt-14">
      <div
        className={`relative transition-all duration-200 ${
          isDragOver ? "border-primary bg-primary/5" : "border-border"
        } ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isDragOver
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon name="Upload" size={32} />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-2">
            Upload Certificate Documents
          </h3>

          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Drag and drop your certificate files here, or click to browse. We
            support PDF, JPG, and PNG formats up to 10MB each.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              variant="default"
              onClick={openFileDialog}
              disabled={isProcessing}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Browse Files
            </Button>

            <div className="text-sm text-muted-foreground">
              or drag files here
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="FileText" size={16} />
              <span>PDF</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Image" size={16} />
              <span>JPG, PNG</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="HardDrive" size={16} />
              <span>Max 10MB</span>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UploadZone;
