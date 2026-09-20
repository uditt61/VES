import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar.jsx';
import { Footer } from '../components/common/Footer.jsx';
import { NoticeBanner } from '../components/common/NoticeBanner.jsx';
import { LeadModal } from '../components/common/LeadModal.jsx';
import { UserCheck } from 'lucide-react';

export const PublicLayout = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalCollegeId, setModalCollegeId] = useState('');
  const [modalCourseId, setModalCourseId] = useState('');

  const openEnquiryModal = (collegeId = '', courseId = '') => {
    setModalCollegeId(collegeId);
    setModalCourseId(courseId);
    setEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setEnquiryModalOpen(false);
    setModalCollegeId('');
    setModalCourseId('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-accent-500 selection:text-white">
      <NoticeBanner />
      <Navbar onOpenEnquiry={() => openEnquiryModal()} />

      <main className="flex-1">
        <Outlet context={{ openEnquiryModal }} />
      </main>

      <Footer />

      {/* Floating CTA Button on Mobile */}
      <div className="fixed bottom-5 right-4 z-30 lg:hidden">
        <button
          onClick={() => openEnquiryModal()}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-accent-600 text-white font-bold text-xs shadow-xl hover:bg-accent-700 transition-transform active:scale-95 border-2 border-white"
          aria-label="Open admission enquiry form"
        >
          <UserCheck className="w-4 h-4" />
          <span>Apply Now</span>
        </button>
      </div>

      {/* Global Lead Modal */}
      <LeadModal
        isOpen={enquiryModalOpen}
        onClose={closeEnquiryModal}
        initialCollegeId={modalCollegeId}
        initialCourseId={modalCourseId}
      />
    </div>
  );
};
