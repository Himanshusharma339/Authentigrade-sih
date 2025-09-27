import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ShareModal = ({ certificate, isOpen, onClose, onShare }) => {
  const [shareSettings, setShareSettings] = useState({
    recipientEmail: '',
    accessDuration: '7',
    includeDetails: true,
    allowDownload: false,
    message: ''
  });

  const durationOptions = [
    { value: '1', label: '1 Day' },
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: 'unlimited', label: 'No Expiry' }
  ];

  const handleShare = () => {
    const shareLink = `https://certifyguard.com/verify/${certificate?.certificateId}?token=abc123xyz`;
    onShare({
      certificate,
      settings: shareSettings,
      shareLink
    });
    onClose();
  };

  const copyToClipboard = () => {
    const shareLink = `https://certifyguard.com/verify/${certificate?.certificateId}?token=abc123xyz`;
    navigator.clipboard?.writeText(shareLink);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Share Certificate</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Certificate Info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{certificate?.title}</h3>
                <p className="text-sm text-muted-foreground">{certificate?.institution}</p>
              </div>
            </div>
          </div>

          {/* Share Settings */}
          <div className="space-y-4">
            <Input
              type="email"
              label="Recipient Email (Optional)"
              placeholder="Enter email address"
              value={shareSettings?.recipientEmail}
              onChange={(e) => setShareSettings(prev => ({ ...prev, recipientEmail: e?.target?.value }))}
            />

            <Select
              label="Access Duration"
              options={durationOptions}
              value={shareSettings?.accessDuration}
              onChange={(value) => setShareSettings(prev => ({ ...prev, accessDuration: value }))}
            />

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={shareSettings?.includeDetails}
                  onChange={(e) => setShareSettings(prev => ({ ...prev, includeDetails: e?.target?.checked }))}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Include certificate details</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={shareSettings?.allowDownload}
                  onChange={(e) => setShareSettings(prev => ({ ...prev, allowDownload: e?.target?.checked }))}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Allow download</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message (Optional)
              </label>
              <textarea
                value={shareSettings?.message}
                onChange={(e) => setShareSettings(prev => ({ ...prev, message: e?.target?.value }))}
                placeholder="Add a personal message..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>

          {/* Share Link Preview */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Share Link</span>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Icon name="Copy" size={16} />
              </Button>
            </div>
            <div className="bg-background border border-border rounded px-3 py-2">
              <p className="text-xs text-muted-foreground font-mono truncate">
                https://certifyguard.com/verify/{certificate?.certificateId}?token=abc123xyz
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleShare}>
            <Icon name="Share2" size={16} />
            <span>Share Certificate</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;