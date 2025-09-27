import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from "./pages/admin-dashboard";
import CertificateUpload from "./pages/certificate-upload";
import UniversityDashboard from "./pages/university-dashboard";
import StudentDashboard from "./pages/student-dashboard";
import CertificateVerification from "./pages/certificate-verification";
import VerificationReports from "./pages/verification-reports";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/certificate-upload" element={<CertificateUpload />} />
          <Route
            path="/university-dashboard"
            element={<UniversityDashboard />}
          />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route
            path="/certificate-verification"
            element={<CertificateVerification />}
          />
          <Route
            path="/verification-reports"
            element={<VerificationReports />}
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

// import React from "react";
// import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
// import ScrollToTop from "components/ScrollToTop";
// import ErrorBoundary from "components/ErrorBoundary";
// import NotFound from "pages/NotFound";
// import AdminDashboard from "./pages/admin-dashboard";
// import CertificateUpload from "./pages/certificate-upload";
// import UniversityDashboard from "./pages/university-dashboard";
// import StudentDashboard from "./pages/student-dashboard";
// import CertificateVerification from "./pages/certificate-verification";
// import VerificationReports from "./pages/verification-reports";
// import Login from "./pages/auth/Login"; // 👈 Login page import

// const Routes = () => {
//   return (
//     <BrowserRouter>
//       <ErrorBoundary>
//         <ScrollToTop />
//         <RouterRoutes>
//           {/* 👇 Sabse pehle Login khulega */}
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />

//           {/* Dashboards */}
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/certificate-upload" element={<CertificateUpload />} />
//           <Route
//             path="/university-dashboard"
//             element={<UniversityDashboard />}
//           />
//           <Route path="/student-dashboard" element={<StudentDashboard />} />
//           <Route
//             path="/certificate-verification"
//             element={<CertificateVerification />}
//           />
//           <Route
//             path="/verification-reports"
//             element={<VerificationReports />}
//           />

//           <Route path="*" element={<NotFound />} />
//         </RouterRoutes>
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// };

// export default Routes;
