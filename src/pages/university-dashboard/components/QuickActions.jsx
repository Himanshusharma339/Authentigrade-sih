// import React from "react";
// import Icon from "../../../components/AppIcon";
// import Button from "../../../components/ui/Button";
// import { useNavigate } from "react-router-dom";

// const QuickActions = () => {
//   const navigate = useNavigate();

//   const quickActions = [
//     {
//       id: 1,
//       title: "Upload Certificates",
//       description: "Bulk upload certificate data",
//       icon: "Upload",
//       color: "bg-primary text-primary-foreground",
//       action: () => navigate("/certificate-upload"),
//     },
//     {
//       id: 2,
//       title: "Generate Reports",
//       description: "Export verification analytics",
//       icon: "BarChart3",
//       color: "bg-success text-success-foreground",
//       action: () => navigate("/verification-reports"),
//     },
//     {
//       id: 3,
//       title: "Manage Templates",
//       description: "Certificate format validation",
//       icon: "FileText",
//       color: "bg-warning text-warning-foreground",
//       action: () => {},
//     },
//     {
//       id: 4,
//       title: "Blacklist Management",
//       description: "Manage flagged certificates",
//       icon: "Shield",
//       color: "bg-error text-error-foreground",
//       action: () => {},
//     },
//   ];

//   const alertsAndNotifications = [
//     {
//       id: 1,
//       type: "warning",
//       title: "High Priority Verification",
//       message: "3 certificates require immediate attention",
//       timestamp: "2 minutes ago",
//       action: "Review Now",
//     },
//     {
//       id: 2,
//       type: "info",
//       title: "Bulk Upload Complete",
//       message: "150 certificates processed successfully",
//       timestamp: "15 minutes ago",
//       action: "View Details",
//     },
//     {
//       id: 3,
//       type: "error",
//       title: "Verification Failed",
//       message: "Certificate ID: BSC2024001 flagged for review",
//       timestamp: "1 hour ago",
//       action: "Investigate",
//     },
//   ];

//   const getAlertIcon = (type) => {
//     switch (type) {
//       case "warning":
//         return { icon: "AlertTriangle", color: "text-warning" };
//       case "error":
//         return { icon: "XCircle", color: "text-error" };
//       case "success":
//         return { icon: "CheckCircle", color: "text-success" };
//       default:
//         return { icon: "Info", color: "text-primary" };
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Quick Actions Grid */}
//       <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-foreground">
//             Quick Actions
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             Frequently used administrative functions
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {quickActions?.map((action) => (
//             <button
//               key={action?.id}
//               onClick={action?.action}
//               className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth text-left group"
//             >
//               <div
//                 className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action?.color} group-hover:scale-105 transition-transform`}
//               >
//                 <Icon name={action?.icon} size={24} />
//               </div>
//               <h4 className="text-sm font-medium text-foreground mb-1">
//                 {action?.title}
//               </h4>
//               <p className="text-xs text-muted-foreground">
//                 {action?.description}
//               </p>
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Alerts and Notifications */}
//       <div className="bg-card border border-border rounded-lg shadow-elevation-1">
//         <div className="p-6 border-b border-border">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold text-foreground">
//                 Alerts & Notifications
//               </h3>
//               <p className="text-sm text-muted-foreground">
//                 Recent system alerts and important updates
//               </p>
//             </div>
//             <Button variant="ghost" size="sm" iconName="Settings">
//               Configure
//             </Button>
//           </div>
//         </div>

//         <div className="divide-y divide-border max-h-80 overflow-y-auto">
//           {alertsAndNotifications?.map((alert) => {
//             const alertConfig = getAlertIcon(alert?.type);
//             return (
//               <div
//                 key={alert?.id}
//                 className="p-4 hover:bg-muted/30 transition-smooth"
//               >
//                 <div className="flex items-start space-x-3">
//                   <div
//                     className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${alertConfig?.color}`}
//                   >
//                     <Icon name={alertConfig?.icon} size={16} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h4 className="text-sm font-medium text-foreground">
//                           {alert?.title}
//                         </h4>
//                         <p className="text-sm text-muted-foreground mt-1">
//                           {alert?.message}
//                         </p>
//                         <p className="text-xs text-muted-foreground mt-2">
//                           {alert?.timestamp}
//                         </p>
//                       </div>
//                       <Button variant="ghost" size="sm" className="ml-2">
//                         {alert?.action}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="p-4 border-t border-border">
//           <Button variant="outline" size="sm" fullWidth iconName="Bell">
//             View All Notifications
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickActions;

import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Upload Certificates",
      description: "Bulk upload certificate data",
      icon: "Upload",
      color: "bg-primary text-primary-foreground",
      action: () => navigate("/certificate-upload"),
    },
    {
      id: 2,
      title: "Generate Reports",
      description: "Export verification analytics",
      icon: "BarChart3",
      color: "bg-success text-success-foreground",
      action: () => navigate("/verification-reports"),
    },
    {
      id: 3,
      title: "Manage Templates",
      description: "Certificate format validation",
      icon: "FileText",
      color: "bg-warning text-warning-foreground",
      action: () => {},
    },
    {
      id: 4,
      title: "Blacklist Management",
      description: "Manage flagged certificates",
      icon: "Shield",
      color: "bg-error text-error-foreground",
      action: () => {},
    },
  ];

  const alertsAndNotifications = [
    {
      id: 1,
      type: "warning",
      title: "High Priority Verification",
      message: "3 certificates require immediate attention",
      timestamp: "2 minutes ago",
      action: "Review Now",
    },
    {
      id: 2,
      type: "info",
      title: "Bulk Upload Complete",
      message: "150 certificates processed successfully",
      timestamp: "15 minutes ago",
      action: "View Details",
    },
    {
      id: 3,
      type: "error",
      title: "Verification Failed",
      message: "Certificate ID: BSC2024001 flagged for review",
      timestamp: "1 hour ago",
      action: "Investigate",
    },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return { icon: "AlertTriangle", color: "text-warning" };
      case "error":
        return { icon: "XCircle", color: "text-error" };
      case "success":
        return { icon: "CheckCircle", color: "text-success" };
      default:
        return { icon: "Info", color: "text-primary" };
    }
  };

  return (
    <div className="space-y-6 md:w-[133%] lg:w-[128%] ml-[-7rem]">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Quick Actions
          </h3>
          <p className="text-sm text-muted-foreground">
            Frequently used administrative functions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-smooth text-left group"
            >
              <div
                className={`w-12 h-10 rounded-lg flex items-center justify-center mb-3 ${action?.color} group-hover:scale-105 transition-transform`}
              >
                <Icon name={action?.icon} size={24} />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1 truncate">
                {action?.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {action?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Alerts and Notifications */}
      <div className="h-10">
        <div className="bg-card border border-border rounded-lg shadow-elevation-1">
          <div className="p-2 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Alerts & Notifications
                </h3>
                <p className="text-sm text-muted-foreground">
                  Recent system alerts and important updates
                </p>
              </div>
              <Button variant="ghost" size="sm" iconName="Settings">
                Configure
              </Button>
            </div>
          </div>

          <div className="divide-y divide-border max-h-80 overflow-y-auto">
            {alertsAndNotifications?.map((alert) => {
              const alertConfig = getAlertIcon(alert?.type);
              return (
                <div
                  key={alert?.id}
                  className="p-3 hover:bg-muted/30 transition-smooth"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${alertConfig?.color}`}
                    >
                      <Icon name={alertConfig?.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground truncate">
                            {alert?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {alert?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {alert?.timestamp}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 whitespace-nowrap"
                        >
                          {alert?.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-border">
            <Button variant="outline" size="sm" fullWidth iconName="Bell">
              View All Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
