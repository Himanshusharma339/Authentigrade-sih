import React, { useState } from 'react';
import { Brain, FileText, AlertTriangle, CheckCircle, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { generateVerificationReport, analyzeCertificateImage } from '../../../services/openaiServices';

const AIVerificationAssistant = ({ certificateData, onReportGenerated }) => {
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [isQuotaError, setIsQuotaError] = useState(false);

  const handleGenerateReport = async () => {
    if (!certificateData) return;
    
    setGenerating(true);
    setError(null);
    setIsQuotaError(false);

    try {
      // First analyze the certificate image if available
      let analysisResults = null;
      if (certificateData?.imageUrl) {
        analysisResults = await analyzeCertificateImage(certificateData?.imageUrl, 'verification');
      }

      // Generate comprehensive verification report
      const verificationReport = await generateVerificationReport(certificateData, analysisResults);
      
      setReport(verificationReport);
      onReportGenerated?.(verificationReport);
    } catch (err) {
      setError(err?.message);
      // Check if it's a quota error
      if (err?.status === 429 || err?.message?.includes('exceeded your current quota') || err?.message?.includes('429')) {
        setIsQuotaError(true);
      }
    } finally {
      setGenerating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'suspicious': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'suspicious': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'rejected': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (!certificateData) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No certificate data available for AI analysis</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Verification Report</h3>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Brain className={`h-4 w-4 ${generating ? 'animate-pulse' : ''}`} />
          <span>{generating ? 'Generating...' : 'Generate AI Report'}</span>
        </button>
      </div>
      {generating && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-600">AI is analyzing the certificate...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
          </div>
        </div>
      )}
      {error && !report && (
        <div className={`border rounded-lg p-4 mb-6 ${isQuotaError ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {isQuotaError ? (
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${isQuotaError ? 'text-orange-800' : 'text-red-800'}`}>
                {isQuotaError ? 'AI Analysis Temporarily Unavailable' : 'Analysis Failed'}
              </h4>
              {isQuotaError ? (
                <div className="mt-2 text-orange-700">
                  <p>The OpenAI API quota has been exceeded. This is a temporary limitation.</p>
                  <div className="mt-3 space-y-2">
                    <p className="font-medium">What you can do:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Contact your system administrator to check billing details</li>
                      <li>Use manual verification methods as backup</li>
                      <li>Try again later when quota resets</li>
                      <li>Consider upgrading your OpenAI plan for higher limits</li>
                    </ul>
                  </div>
                  <div className="mt-3 flex items-center space-x-2 text-sm">
                    <RefreshCw className="h-4 w-4" />
                    <span>Quota typically resets monthly or when billing is resolved</span>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-red-700">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
      {report && (
        <div className="space-y-6">
          {/* Quota Warning if report is fallback */}
          {report?.summary?.includes('quota') && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-yellow-800 font-medium">Limited Analysis Mode</p>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                AI analysis is running in fallback mode due to quota limits. Manual verification is recommended.
              </p>
            </div>
          )}

          {/* Verification Status */}
          <div className={`border rounded-lg p-4 ${getStatusColor(report?.verificationStatus)}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(report?.verificationStatus)}
                <h4 className="font-semibold">Status: {report?.verificationStatus?.toUpperCase()}</h4>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Risk Score: {report?.overallRiskScore}/100</p>
                <p className={`text-xs ${getRiskColor(report?.riskLevel)}`}>
                  {report?.riskLevel?.toUpperCase()} RISK
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Executive Summary</h4>
            <p className="text-sm text-gray-700">{report?.summary}</p>
          </div>

          {/* Key Findings */}
          {report?.findings && report?.findings?.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Findings</h4>
              <ul className="space-y-2">
                {report?.findings?.map((finding, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Red Flags */}
          {report?.redFlags && report?.redFlags?.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                Red Flags
              </h4>
              <ul className="space-y-2">
                {report?.redFlags?.map((flag, index) => (
                  <li key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <span className="text-sm text-red-800">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {report?.recommendations && report?.recommendations?.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {report?.recommendations?.map((recommendation, index) => (
                  <li key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <span className="text-sm text-blue-800">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Actions */}
          {report?.nextActions && report?.nextActions?.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Next Actions</h4>
              <ul className="space-y-2">
                {report?.nextActions?.map((action, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verifier Notes */}
          {report?.verifierNotes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Verifier Notes</h4>
              <p className="text-sm text-yellow-700">{report?.verifierNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIVerificationAssistant;