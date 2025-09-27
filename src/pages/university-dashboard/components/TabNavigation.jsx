import React from "react";
import Icon from "../../../components/AppIcon";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "management", label: "Certificate Management", icon: "FileText" },
    { id: "activity", label: "Verification Activity", icon: "Activity" },
    { id: "profile", label: "Institution Profile", icon: "Building" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 md:w-[90%] lg:w-[85%]">
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-smooth border-b-2 ${
              activeTab === tab?.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
