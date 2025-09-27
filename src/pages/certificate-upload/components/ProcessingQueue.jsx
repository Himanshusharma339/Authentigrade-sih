import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueue = ({ files, onRemoveFile, onClearAll, onStartProcessing }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return { name: 'Clock', color: 'text-warning' };
      case 'processing':
        return { name: 'Loader2', color: 'text-primary animate-spin' };
      case 'extracting':
        return { name: 'ScanLine', color: 'text-accent animate-pulse' };
      case 'verifying':
        return { name: 'Shield', color: 'text-secondary animate-pulse' };
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'failed':
        return { name: 'XCircle', color: 'text-destructive' };
      default:
        return { name: 'File', color: 'text-muted-foreground' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Waiting to process';
      case 'processing':
        return 'Initializing...';
      case 'extracting':
        return 'Extracting text with OCR';
      case 'verifying':
        return 'Verifying against database';
      case 'completed':
        return 'Verification complete';
      case 'failed':
        return 'Processing failed';
      default:
        return 'Unknown status';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  if (files?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <Icon name="FileStack" size={24} className="text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No files uploaded</h3>
        <p className="text-muted-foreground">
          Upload certificate documents to see them in the processing queue
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Processing Queue</h3>
          <p className="text-sm text-muted-foreground">
            {files?.length} file{files?.length !== 1 ? 's' : ''} ready for verification
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            iconName="Trash2"
            iconPosition="left"
          >
            Clear All
          </Button>
          
          <Button
            variant="default"
            onClick={onStartProcessing}
            iconName="Play"
            iconPosition="left"
            disabled={files?.some(f => f?.status === 'processing' || f?.status === 'extracting' || f?.status === 'verifying')}
          >
            Start Processing
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {files?.map((file) => {
          const statusIcon = getStatusIcon(file?.status);
          
          return (
            <div key={file?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon 
                      name={file?.type === 'application/pdf' ? 'FileText' : 'Image'} 
                      size={20} 
                      className="text-muted-foreground" 
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {file?.name}
                    </h4>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFile(file?.id)}
                      className="flex-shrink-0 ml-2"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file?.size)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <Icon name={statusIcon?.name} size={16} className={statusIcon?.color} />
                      <span className="text-xs text-muted-foreground">
                        {getStatusText(file?.status)}
                      </span>
                    </div>
                  </div>
                  
                  {file?.status === 'processing' || file?.status === 'extracting' || file?.status === 'verifying' ? (
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file?.progress || 0}%` }}
                      />
                    </div>
                  ) : null}
                  
                  {file?.extractedData && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <h5 className="text-xs font-medium text-foreground mb-2">Extracted Information:</h5>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {file?.extractedData?.studentName && (
                          <div>
                            <span className="text-muted-foreground">Name:</span>
                            <span className="ml-1 text-foreground">{file?.extractedData?.studentName}</span>
                          </div>
                        )}
                        {file?.extractedData?.institution && (
                          <div>
                            <span className="text-muted-foreground">Institution:</span>
                            <span className="ml-1 text-foreground">{file?.extractedData?.institution}</span>
                          </div>
                        )}
                        {file?.extractedData?.certificateId && (
                          <div>
                            <span className="text-muted-foreground">Certificate ID:</span>
                            <span className="ml-1 text-foreground">{file?.extractedData?.certificateId}</span>
                          </div>
                        )}
                        {file?.extractedData?.grade && (
                          <div>
                            <span className="text-muted-foreground">Grade:</span>
                            <span className="ml-1 text-foreground">{file?.extractedData?.grade}</span>
                          </div>
                        )}
                      </div>
                      
                      {file?.confidence && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <div className="flex-1 bg-background rounded-full h-1">
                            <div 
                              className={`h-1 rounded-full ${
                                file?.confidence >= 90 ? 'bg-success' : 
                                file?.confidence >= 70 ? 'bg-warning' : 'bg-destructive'
                              }`}
                              style={{ width: `${file?.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {file?.confidence}%
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {file?.status === 'failed' && file?.error && (
                    <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs text-destructive">
                      {file?.error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingQueue;