import React, { useState, useEffect } from "react";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Shield,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import { generateFraudInsights } from "../../../services/openaiServices";

const AIInsightsTab = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    setLoading(true);
    try {
      // Mock certificate history - in real app, fetch from your database
      const mockCertificateHistory = [
        {
          id: "1",
          studentName: "Manoj Kumar",
          institution: "IGNTU",
          verificationStatus: "verified",
          riskLevel: "low",
          timestamp: "2024-09-14T10:00:00Z",
        },
        // Add more mock data as needed
      ];

      const result = await generateFraudInsights(mockCertificateHistory);
      setInsights(result);
      setLastUpdated(new Date()?.toISOString());
    } catch (error) {
      console.error("Error generating insights:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "High":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            AI Fraud Insights
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Updated: {new Date(lastUpdated)?.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={generateInsights}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Analyzing..." : "Refresh Insights"}</span>
          </button>
        </div>
      </div>
      {loading && !insights ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Generating AI insights...</p>
            <p className="text-sm text-gray-500 mt-1">
              Analyzing patterns in certificate data
            </p>
          </div>
        </div>
      ) : insights ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Risk Assessment */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Risk Assessment
              </h3>
            </div>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${getRiskColor("Medium")}`}>
                <p className="font-medium">Overall Risk Level</p>
                <p className="text-sm opacity-75">
                  {insights?.overallRiskAssessment}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Confidence Score:</span>
                <span className="font-medium">
                  {(insights?.confidence * 100)?.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Fraud Trends */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Fraud Trends
              </h3>
            </div>
            <div className="space-y-2">
              {insights?.fraudTrends?.map((trend, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <BarChart3 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{trend}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suspicious Patterns */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Suspicious Patterns
              </h3>
            </div>
            <div className="space-y-3">
              {insights?.suspiciousPatterns?.map((pattern, index) => (
                <div
                  key={index}
                  className="bg-orange-50 border border-orange-200 rounded-lg p-3"
                >
                  <p className="text-sm text-orange-800">{pattern}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Indicators */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Risk Indicators
              </h3>
            </div>
            <div className="space-y-2">
              {insights?.riskIndicators?.map((indicator, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{indicator}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Recommendations */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Prevention Recommendations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights?.preventionRecommendations?.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <p className="text-sm text-green-800">{recommendation}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Alert Thresholds */}
          {insights?.alertThresholds &&
            insights?.alertThresholds?.length > 0 && (
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recommended Alert Thresholds
                  </h3>
                </div>
                <div className="space-y-2">
                  {insights?.alertThresholds?.map((threshold, index) => (
                    <div
                      key={index}
                      className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
                    >
                      <p className="text-sm text-yellow-800">{threshold}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No insights available</p>
            <p className="text-sm text-gray-500 mt-1">
              Click "Refresh Insights" to generate AI analysis
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsTab;
