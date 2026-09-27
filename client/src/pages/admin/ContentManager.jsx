import React, { useState, useEffect } from 'react';
import { FileText, Save, Sparkles, CheckCircle2, Phone, Mail, Building } from 'lucide-react';
import api from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

export const ContentManager = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState('');

  const [heroContent, setHeroContent] = useState({
    badge: 'Educational Guidance & Social Welfare Society',
    title: 'Shape Your Future With the Right Education & Verified Guidance',
    subtitle: 'Explore recognized universities, discover industry-aligned degree courses, and receive honest, personalized educational guidance from Vidhya Advance Education Social Welfare Society.',
  });

  const [noticeBanner, setNoticeBanner] = useState({
    isActive: true,
    message: 'Admissions Open for Academic Session 2026-2027. Early counselling slots available!',
    linkText: 'Apply Now',
    linkUrl: '/enquiry',
  });

  const [contactInfo, setContactInfo] = useState({
    organization: 'Vidhya Advance Education Social Welfare Society',
    address: 'Plot No. 12, Commercial Complex, MP Nagar Zone-II, Bhopal, Madhya Pradesh - 462011',
    primaryPhone: '+91 755 4239876',
    helplinePhone: '+91 98765 43210',
    email: 'contact@vidhyaadvance.com',
    admissionsEmail: 'societyvidhya1964@gmail.com',
    workingHours: 'Monday - Saturday: 9:30 AM to 6:30 PM',
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await api.get('/content');
        if (data.data?.hero_content) setHeroContent(data.data.hero_content);
        if (data.data?.notice_banner) setNoticeBanner(data.data.notice_banner);
        if (data.data?.contact_info) setContactInfo(data.data.contact_info);
      } catch (err) {
        // Fallback to initial values
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async (key, value, description) => {
    setSavingKey(key);
    try {
      await api.put(`/content/${key}`, { value, description });
      showToast(`Content for "${key}" updated successfully!`, 'success');
    } catch (err) {
      showToast('Failed to update content', 'error');
    } finally {
      setSavingKey('');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading website CMS content...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Website Content Management (CMS)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Dynamically update the homepage banner headlines, active announcements, and office contact information.
        </p>
      </div>

      {/* 1. Announcement Notice Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-600" />
            <h2 className="font-display font-bold text-lg text-slate-900">
              Top Announcement Ticker
            </h2>
          </div>
          <button
            onClick={() => handleSave('notice_banner', noticeBanner, 'Top announcement banner')}
            disabled={savingKey === 'notice_banner'}
            className="px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savingKey === 'notice_banner' ? 'Saving...' : 'Save Ticker'}</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noticeActive"
              checked={noticeBanner.isActive}
              onChange={(e) => setNoticeBanner({ ...noticeBanner, isActive: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded"
            />
            <label htmlFor="noticeActive" className="font-semibold text-slate-700 cursor-pointer">
              Enable Announcement Ticker on Public Website
            </label>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Announcement Message *</label>
            <input
              type="text"
              value={noticeBanner.message}
              onChange={(e) => setNoticeBanner({ ...noticeBanner, message: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Button / Link Text</label>
              <input
                type="text"
                value={noticeBanner.linkText}
                onChange={(e) => setNoticeBanner({ ...noticeBanner, linkText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target URL</label>
              <input
                type="text"
                value={noticeBanner.linkUrl}
                onChange={(e) => setNoticeBanner({ ...noticeBanner, linkUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Homepage Hero Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-700" />
            <h2 className="font-display font-bold text-lg text-slate-900">
              Homepage Hero Section
            </h2>
          </div>
          <button
            onClick={() => handleSave('hero_content', heroContent, 'Homepage Hero Banner text')}
            disabled={savingKey === 'hero_content'}
            className="px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savingKey === 'hero_content' ? 'Saving...' : 'Save Hero'}</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Top Badge Text</label>
            <input
              type="text"
              value={heroContent.badge}
              onChange={(e) => setHeroContent({ ...heroContent, badge: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Main Headline *</label>
            <input
              type="text"
              value={heroContent.title}
              onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subheading Paragraph</label>
            <textarea
              rows={3}
              value={heroContent.subtitle}
              onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Official Contact Info */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-600" />
            <h2 className="font-display font-bold text-lg text-slate-900">
              Official Head Office & Contact Details
            </h2>
          </div>
          <button
            onClick={() => handleSave('contact_info', contactInfo, 'Organization contact details')}
            disabled={savingKey === 'contact_info'}
            className="px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savingKey === 'contact_info' ? 'Saving...' : 'Save Contacts'}</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Registered Address *</label>
            <input
              type="text"
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Office Phone *</label>
              <input
                type="text"
                value={contactInfo.primaryPhone}
                onChange={(e) => setContactInfo({ ...contactInfo, primaryPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Helpline</label>
              <input
                type="text"
                value={contactInfo.helplinePhone}
                onChange={(e) => setContactInfo({ ...contactInfo, helplinePhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Admissions Email *</label>
              <input
                type="email"
                value={contactInfo.admissionsEmail}
                onChange={(e) => setContactInfo({ ...contactInfo, admissionsEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">General Inquiries Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
