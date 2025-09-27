import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Icon from "../../../components/AppIcon";

const AnalyticsTab = () => {
  const fraudTrendData = [
    { month: "Jan", fraudAttempts: 45, detectionRate: 92 },
    { month: "Feb", fraudAttempts: 52, detectionRate: 94 },
    { month: "Mar", fraudAttempts: 38, detectionRate: 96 },
    { month: "Apr", fraudAttempts: 61, detectionRate: 89 },
    { month: "May", fraudAttempts: 43, detectionRate: 97 },
    { month: "Jun", fraudAttempts: 55, detectionRate: 95 },
  ];

  const geographicData = [
    { region: "North America", verifications: 2340, fraudRate: 3.2 },
    { region: "Europe", verifications: 1890, fraudRate: 2.8 },
    { region: "Asia", verifications: 3120, fraudRate: 4.1 },
    { region: "Australia", verifications: 890, fraudRate: 5.3 },
    { region: "Africa", verifications: 450, fraudRate: 6.2 },
  ];

  const institutionPerformance = [
    { name: "MIT", verifications: 1200, accuracy: 98.5, color: "#0EA5E9" },
    { name: "Stanford", verifications: 980, accuracy: 97.8, color: "#059669" },
    { name: "IGNTU", verifications: 1450, accuracy: 99.1, color: "#DC2626" },
    { name: "Monash", verifications: 750, accuracy: 96.9, color: "#D97706" },
    { name: "Caltech", verifications: 420, accuracy: 98.8, color: "#7C3AED" },
  ];

  const COLORS = ["#0EA5E9", "#059669", "#DC2626", "#D97706", "#7C3AED"];

  return (
    <div className="space-y-6">
      {/* Fraud Trend Analysis */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Fraud Trend Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Monthly fraud attempts and detection rates
              </p>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fraudTrendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="fraudAttempts"
                fill="var(--color-destructive)"
                name="Fraud Attempts"
              />
              <Line
                type="monotone"
                dataKey="detectionRate"
                stroke="var(--color-success)"
                strokeWidth={3}
                name="Detection Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Verification Patterns */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Geographic Patterns
              </h3>
              <p className="text-sm text-muted-foreground">
                Verification activity by region
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {geographicData?.map((region, index) => (
              <div
                key={region?.region}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: COLORS?.[index] }}
                  ></div>
                  <span className="font-medium text-foreground">
                    {region?.region}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {region?.verifications?.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {region?.fraudRate}% fraud rate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institution Performance */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Institution Performance
              </h3>
              <p className="text-sm text-muted-foreground">
                Top performing institutions
              </p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={institutionPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="verifications"
                >
                  {institutionPerformance?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS?.[index % COLORS?.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {institutionPerformance?.map((institution, index) => (
              <div
                key={institution?.name}
                className="flex items-center space-x-2 text-sm"
              >
                <div
                  className={`w-2 h-2 rounded-full`}
                  style={{ backgroundColor: COLORS?.[index] }}
                ></div>
                <span className="text-foreground">{institution?.name}</span>
                <span className="text-muted-foreground">
                  ({institution?.accuracy}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
