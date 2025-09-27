import React, { useState, useEffect } from "react";
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";
import { analyzeCertificateImage } from "../../../services/openaiServices";

const AIAnalysisPanel = ({ uploadedFile, onAnalysisComplete }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (uploadedFile) {
      analyzeImage();
    }
  }, [uploadedFile]);

  const analyzeImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeCertificateImage(uploadedFile, "certificate");
      setAnalysis(result);
      onAnalysisComplete?.(result);
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "high":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  if (!uploadedFile) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Brain className="h-12 w-12 text-black-400 mx-auto mb-3" />
        <p className="text-black-600">
          Upload a certificate to start AI analysis
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Analyzing certificate...</p>
            <p className="text-sm text-gray-500 mt-1">
              This may take a few moments
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-600 font-medium">Analysis Failed</p>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
          <button
            onClick={analyzeImage}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    );
  }

  if (analysis) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            AI Analysis Results
          </h3>
        </div>
        {/* Risk Assessment */}
        <div
          className={`border rounded-lg p-4 mb-6 ${getRiskColor(
            analysis?.fraudRiskLevel
          )}`}
        >
          <div className="flex items-center space-x-3 mb-2">
            {getRiskIcon(analysis?.fraudRiskLevel)}
            <h4 className="font-semibold">
              Risk Assessment: {analysis?.fraudRiskLevel?.toUpperCase()}
            </h4>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span>
              Confidence: {(analysis?.confidenceScore * 100)?.toFixed(1)}%
            </span>
          </div>
        </div>
        {/* Extracted Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">
              Extracted Information
            </h4>
            <div className="space-y-2 text-sm">
              {analysis?.studentName && (
                <div>
                  <span className="font-medium text-gray-700">Student:</span>
                  <span className="ml-2 text-gray-900">
                    {analysis?.studentName}
                  </span>
                </div>
              )}
              {analysis?.institution && (
                <div>
                  <span className="font-medium text-gray-700">
                    Institution:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {analysis?.institution}
                  </span>
                </div>
              )}
              {analysis?.degree && (
                <div>
                  <span className="font-medium text-gray-700">Degree:</span>
                  <span className="ml-2 text-gray-900">{analysis?.degree}</span>
                </div>
              )}
              {analysis?.graduationDate && (
                <div>
                  <span className="font-medium text-gray-700">Graduation:</span>
                  <span className="ml-2 text-gray-900">
                    {analysis?.graduationDate}
                  </span>
                </div>
              )}
              {analysis?.gpa && (
                <div>
                  <span className="font-medium text-gray-700">GPA:</span>
                  <span className="ml-2 text-gray-900">{analysis?.gpa}</span>
                </div>
              )}
              {analysis?.honors && (
                <div>
                  <span className="font-medium text-gray-700">Honors:</span>
                  <span className="ml-2 text-gray-900">{analysis?.honors}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Analysis Notes</h4>
            <p className="text-sm text-gray-700">{analysis?.analysisNotes}</p>
          </div>
        </div>
        {/* Inconsistencies */}
        {analysis?.inconsistencies && analysis?.inconsistencies?.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
              Inconsistencies Found
            </h4>
            <ul className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-1">
              {analysis?.inconsistencies?.map((item, index) => (
                <li key={index} className="text-sm text-orange-800">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Recommendations */}
        {analysis?.recommendations && analysis?.recommendations?.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Recommendations
            </h4>
            <ul className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
              {analysis?.recommendations?.map((item, index) => (
                <li key={index} className="text-sm text-blue-800">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default AIAnalysisPanel;
