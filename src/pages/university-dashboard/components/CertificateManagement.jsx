// import React, { useState } from "react";
// import Icon from "../../../components/AppIcon";
// import Button from "../../../components/ui/Button";

// const CertificateManagement = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleDrag = (e) => {
//     e?.preventDefault();
//     e?.stopPropagation();
//     if (e?.type === "dragenter" || e?.type === "dragover") {
//       setDragActive(true);
//     } else if (e?.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e?.preventDefault();
//     e?.stopPropagation();
//     setDragActive(false);

//     if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
//       handleFiles(e?.dataTransfer?.files);
//     }
//   };

//   const handleFiles = (files) => {
//     setIsUploading(true);
//     setUploadProgress(0);

//     // Simulate upload progress
//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setIsUploading(false);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 200);
//   };

//   const recentUploads = [
//     {
//       id: 1,
//       fileName: "batch_certificates_2024.xlsx",
//       uploadDate: "2025-01-14 14:30:22",
//       status: "completed",
//       processed: 150,
//       total: 150,
//     },
//     {
//       id: 2,
//       fileName: "graduate_certificates_dec.pdf",
//       uploadDate: "2025-01-14 13:15:45",
//       status: "processing",
//       processed: 85,
//       total: 120,
//     },
//     {
//       id: 3,
//       fileName: "undergraduate_batch_1.csv",
//       uploadDate: "2025-01-14 11:20:30",
//       status: "failed",
//       processed: 0,
//       total: 200,
//     },
//   ];

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       completed: {
//         color: "bg-success text-success-foreground",
//         icon: "CheckCircle",
//         label: "Completed",
//       },
//       processing: {
//         color: "bg-warning text-warning-foreground",
//         icon: "Clock",
//         label: "Processing",
//       },
//       failed: {
//         color: "bg-error text-error-foreground",
//         icon: "XCircle",
//         label: "Failed",
//       },
//     };

//     const config = statusConfig?.[status] || statusConfig?.processing;

//     return (
//       <span
//         className={`inline-flex items-center space-x-1 px-2 py-4 rounded-full text-xs font-medium ${config?.color}`}
//       >
//         <Icon name={config?.icon} size={12} />
//         <span>{config?.label}</span>
//       </span>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Bulk Upload Section */}
//       <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-foreground mb-2">
//             Bulk Certificate Upload
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             Upload multiple certificates at once using Excel, CSV, or PDF files
//           </p>
//         </div>

//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
//             dragActive
//               ? "border-primary bg-primary/5"
//               : "border-border hover:border-primary/50 hover:bg-muted/30"
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <div className="flex flex-col items-center space-y-4">
//             <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
//               <Icon name="Upload" size={32} className="text-primary" />
//             </div>
//             <div>
//               <h4 className="text-lg font-medium text-foreground mb-2">
//                 {dragActive ? "Drop files here" : "Drag & drop files here"}
//               </h4>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Supported formats: .xlsx, .csv, .pdf (Max 50MB)
//               </p>
//               <Button variant="outline" iconName="FolderOpen">
//                 Browse Files
//               </Button>
//             </div>
//           </div>
//         </div>

//         {isUploading && (
//           <div className="mt-4 p-4 bg-muted rounded-lg">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-medium text-foreground">
//                 Uploading...
//               </span>
//               <span className="text-sm text-muted-foreground">
//                 {uploadProgress}%
//               </span>
//             </div>
//             <div className="w-full bg-border rounded-full h-2">
//               <div
//                 className="bg-primary h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-border">
//           <Button variant="default" iconName="Upload">
//             Upload Certificates
//           </Button>
//           <Button variant="outline" iconName="Download">
//             Download Template
//           </Button>
//           <Button variant="ghost" iconName="HelpCircle">
//             Upload Guide
//           </Button>
//         </div>
//       </div>
//       {/* Recent Uploads */}
//       <div className="bg-card border border-border rounded-lg shadow-elevation-1">
//         <div className="p-6 border-b border-border">
//           <h3 className="text-lg font-semibold text-foreground">
//             Recent Uploads
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             Track your recent certificate upload batches
//           </p>
//         </div>

//         <div className="divide-y divide-border">
//           {recentUploads?.map((upload) => (
//             <div
//               key={upload?.id}
//               className="p-6 hover:bg-muted/30 transition-smooth"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
//                     <Icon name="FileText" size={20} className="text-primary" />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-foreground">
//                       {upload?.fileName}
//                     </h4>
//                     <p className="text-xs text-muted-foreground">
//                       {upload?.uploadDate}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="text-right">
//                     <div className="text-sm text-foreground">
//                       {upload?.processed}/{upload?.total} processed
//                     </div>
//                     {upload?.status === "processing" && (
//                       <div className="w-24 bg-border rounded-full h-1 mt-1">
//                         <div
//                           className="bg-warning h-1 rounded-full transition-all"
//                           style={{
//                             width: `${
//                               (upload?.processed / upload?.total) * 100
//                             }%`,
//                           }}
//                         ></div>
//                       </div>
//                     )}
//                   </div>
//                   {getStatusBadge(upload?.status)}
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     iconName="MoreHorizontal"
//                   ></Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateManagement;

import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CertificateManagement = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const recentUploads = [
    {
      id: 1,
      fileName: "certificates_batch_01.xlsx",
      uploadDate: "2025-09-15",
      processed: 120,
      total: 150,
      status: "processing",
    },
    {
      id: 2,
      fileName: "batch_02.csv",
      uploadDate: "2025-09-10",
      processed: 200,
      total: 200,
      status: "completed",
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload here
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: {
        label: "Completed",
        icon: "CheckCircle",
        color: "bg-success/10 text-success",
      },
      processing: {
        label: "Processing",
        icon: "Loader",
        color: "bg-warning/10 text-warning",
      },
      failed: {
        label: "Failed",
        icon: "XCircle",
        color: "bg-error/10 text-error",
      },
    }[status];

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}
      >
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  return (
    <div className="space-y-4 w-full md:w-[90%] lg:w-[85%]">
      {/* Bulk Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-foreground mb-1">
            Bulk Certificate Upload
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            Upload multiple certificates at once using Excel, CSV, or PDF files
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-smooth ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {dragActive ? "Drop files here" : "Drag & drop files here"}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Supported formats: .xlsx, .csv, .pdf (Max 50MB)
              </p>
              <Button variant="outline" size="sm" iconName="FolderOpen">
                Browse Files
              </Button>
            </div>
          </div>
        </div>

        {isUploading && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">
                Uploading...
              </span>
              <span className="text-xs text-muted-foreground">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-border">
          <Button variant="default" size="sm" iconName="Upload">
            Upload
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Template
          </Button>
          <Button variant="ghost" size="sm" iconName="HelpCircle">
            Guide
          </Button>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="h-60">
        <div className="bg-card border border-border rounded-lg shadow-elevation-1 h-60">
          <div className="p-6 border-b border-border ">
            <h3 className="text-base font-semibold text-foreground">
              Recent Uploads
            </h3>
            <p className="text-xs text-muted-foreground">
              Track your recent certificate upload batches
            </p>
          </div>

          <div className="divide-y divide-border">
            {recentUploads?.map((upload) => (
              <div
                key={upload?.id}
                className="p-4 hover:bg-muted/30 transition-smooth"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon
                        name="FileText"
                        size={16}
                        className="text-primary"
                      />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-medium text-foreground truncate max-w-[140px]">
                        {upload?.fileName}
                      </h4>
                      <p className="text-[10px] text-muted-foreground">
                        {upload?.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-xs text-foreground whitespace-nowrap">
                        {upload?.processed}/{upload?.total} processed
                      </div>
                      {upload?.status === "processing" && (
                        <div className="w-20 bg-border rounded-full h-1 mt-1">
                          <div
                            className="bg-warning h-1 rounded-full transition-all"
                            style={{
                              width: `${
                                (upload?.processed / upload?.total) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                    {getStatusBadge(upload?.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                    ></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateManagement;
