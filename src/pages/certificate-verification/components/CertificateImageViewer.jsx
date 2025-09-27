import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CertificateImageViewer = ({ certificate, onZoomChange }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showOriginal, setShowOriginal] = useState(true);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 25, 200);
    setZoomLevel(newZoom);
    onZoomChange?.(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 25, 50);
    setZoomLevel(newZoom);
    onZoomChange?.(newZoom);
  };

  const resetZoom = () => {
    setZoomLevel(100);
    onZoomChange?.(100);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden md:w-[110%] lg:w-[105%]">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="FileImage" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Certificate Image</h3>
            <p className="text-sm text-muted-foreground">
              {certificate?.fileName} • {certificate?.fileSize}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(true)}
              className={showOriginal ? "bg-background shadow-sm" : ""}
            >
              Original
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(false)}
              className={!showOriginal ? "bg-background shadow-sm" : ""}
            >
              Processed
            </Button>
          </div>

          <div className="w-px h-6 bg-border"></div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <Icon name="ZoomOut" size={16} />
            </Button>
            <span className="text-sm font-medium text-muted-foreground min-w-12 text-center">
              {zoomLevel}%
            </span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <Icon name="ZoomIn" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={resetZoom}>
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="relative bg-muted/30 min-h-96 flex items-center justify-center overflow-auto">
        <div
          className="transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <Image
            src={
              showOriginal
                ? certificate?.originalImage
                : certificate?.processedImage
            }
            alt="Certificate for verification"
            className="w-80 h-80 border border-border rounded shadow-sm"
          />
        </div>

        {certificate?.ocrRegions && !showOriginal && (
          <div className="absolute inset-0 pointer-events-none">
            {certificate?.ocrRegions?.map((region, index) => (
              <div
                key={index}
                className="absolute border-2 border-accent bg-accent/10"
                style={{
                  left: `${region?.x}%`,
                  top: `${region?.y}%`,
                  width: `${region?.width}%`,
                  height: `${region?.height}%`,
                  transform: `scale(${zoomLevel / 100})`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                  {region?.field}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              Resolution: {certificate?.resolution}
            </span>
            <span className="text-muted-foreground">
              Format: {certificate?.format}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Share2" size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateImageViewer;
