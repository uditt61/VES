import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

// Layouts
import { PublicLayout } from './layouts/PublicLayout.jsx';
import { AdminLayout } from './layouts/AdminLayout.jsx';

// Public Pages
import { Home } from './pages/public/Home.jsx';
import { About } from './pages/public/About.jsx';
import { Colleges } from './pages/public/Colleges.jsx';
import { CollegeDetail } from './pages/public/CollegeDetail.jsx';
import { Courses } from './pages/public/Courses.jsx';
import { SocialWork } from './pages/public/SocialWork.jsx';
import { FAQ } from './pages/public/FAQ.jsx';
import { Grievance } from './pages/public/Grievance.jsx';
import { Contact } from './pages/public/Contact.jsx';
import { Enquiry } from './pages/public/Enquiry.jsx';
import { PrivacyPolicy } from './pages/public/PrivacyPolicy.jsx';
import { TermsConditions } from './pages/public/TermsConditions.jsx';
import { NotFound } from './pages/public/NotFound.jsx';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin.jsx';
import { Dashboard } from './pages/admin/Dashboard.jsx';
import { EnquiryManager } from './pages/admin/EnquiryManager.jsx';
import { CollegeManager } from './pages/admin/CollegeManager.jsx';
import { CourseManager } from './pages/admin/CourseManager.jsx';
import { GrievanceManager } from './pages/admin/GrievanceManager.jsx';
import { FAQManager } from './pages/admin/FAQManager.jsx';
import { SocialWorkManager } from './pages/admin/SocialWorkManager.jsx';
import { ContentManager } from './pages/admin/ContentManager.jsx';
import { AdminUserManager } from './pages/admin/AdminUserManager.jsx';
import { AuditLogViewer } from './pages/admin/AuditLogViewer.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/colleges/:slug" element={<CollegeDetail />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/social-work" element={<SocialWork />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/grievance" element={<Grievance />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Portal Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="enquiries" element={<EnquiryManager />} />
              <Route path="colleges" element={<CollegeManager />} />
              <Route path="courses" element={<CourseManager />} />
              <Route path="grievances" element={<GrievanceManager />} />
              <Route path="faqs" element={<FAQManager />} />
              <Route path="social-work" element={<SocialWorkManager />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="admin-users" element={<AdminUserManager />} />
              <Route path="audit-logs" element={<AuditLogViewer />} />
              <Route path="settings" element={<ContentManager />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
