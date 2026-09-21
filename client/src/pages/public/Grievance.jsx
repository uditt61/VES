import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MessageSquareWarning,
  Send,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';
import api from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { Badge } from '../../components/common/Badge.jsx';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import { PAGE_SEO, buildBreadcrumbJsonLd } from '../../utils/seoData.js';

const grievanceSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  phone: z.string().min(10, 'Valid 10-digit mobile number required').max(15),
  email: z.string().email('Valid email address required'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  category: z.enum([
    'Admission Guidance',
    'Documentation',
    'Fee Query',
    'Counselling Process',
    'Staff Behaviour',
    'Other',
  ]),
  description: z.string().min(10, 'Please describe your grievance in detail (min 10 characters)').max(2000),
  website_trap: z.string().optional(),
});

export const Grievance = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'track'
  const [submitting, setSubmitting] = useState(false);
  const [submittedGrievance, setSubmittedGrievance] = useState(null);

  // Tracking state
  const [trackId, setTrackId] = useState('');
  const [trackPhone, setTrackPhone] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(grievanceSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      category: 'Admission Guidance',
      description: '',
      website_trap: '',
    },
  });

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const response = await api.post('/grievances', formData);
      if (response.data?.success) {
        setSubmittedGrievance(response.data.data);
        showToast('Grievance registered successfully!', 'success');
        reset();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit grievance. Please try again.';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackId.trim()) {
      setTrackingError('Please enter your Grievance Tracking ID');
      return;
    }

    setTrackingLoading(true);
    setTrackingError('');
    setTrackingResult(null);

    try {
      const { data } = await api.get(`/grievances/track?grievanceId=${trackId.trim()}&phone=${trackPhone.trim()}`);
      setTrackingResult(data.data);
    } catch (err) {
      setTrackingError(
        err.response?.data?.message || 'No grievance record found with this ID and phone combination.'
      );
    } finally {
      setTrackingLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Open':
        return 'primary';
      case 'Under Review':
        return 'warning';
      case 'In Progress':
        return 'purple';
      case 'Resolved':
        return 'success';
      case 'Closed':
        return 'neutral';
      default:
        return 'primary';
    }
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title={PAGE_SEO.grievance.title}
        description={PAGE_SEO.grievance.description}
        keywords={PAGE_SEO.grievance.keywords}
        canonicalPath="/grievance"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Grievance Portal', url: '/grievance' },
          ]),
        ]}
      />
      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            Student Redressal
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Grievance Redressal Mechanism
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We are committed to transparency and student satisfaction. If you have any concerns regarding admission counselling or documentation, submit your grievance below.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'submit'
                ? 'bg-white text-brand-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Submit Grievance
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'track'
                ? 'bg-white text-brand-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Track Existing Grievance
          </button>
        </div>

        {/* SUBMIT TAB */}
        {activeTab === 'submit' && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submittedGrievance ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  Grievance Registered
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your concern regarding <strong className="text-slate-800">"{submittedGrievance.subject}"</strong> has been assigned to our compliance officer.
                </p>
                <div className="inline-block bg-brand-50 border border-brand-200 text-brand-900 font-mono font-bold px-5 py-2.5 rounded-xl text-lg">
                  {submittedGrievance.grievanceId}
                </div>
                <p className="text-xs text-slate-400">
                  Please save this Tracking ID. We typically respond within 48 business hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmittedGrievance(null)}
                    className="px-6 py-2.5 rounded-xl bg-brand-900 text-white font-semibold text-xs shadow hover:bg-brand-800"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="text"
                  {...register('website_trap')}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      {...register('name')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit phone"
                      {...register('phone')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      {...register('email')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Grievance Category *
                    </label>
                    <select
                      {...register('category')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    >
                      <option value="Admission Guidance">Admission Guidance</option>
                      <option value="Documentation">Documentation Process</option>
                      <option value="Fee Query">Fee Query / Guidance</option>
                      <option value="Counselling Process">Counselling Process</option>
                      <option value="Staff Behaviour">Staff Behaviour</option>
                      <option value="Other">Other Issues</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject / Concern Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Short summary of your issue..."
                    {...register('subject')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Grievance Description *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide specific dates, counsellor name, and details of the issue..."
                    {...register('description')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? 'Registering Grievance...' : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Grievance</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TRACK TAB */}
        {activeTab === 'track' && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Track Your Grievance Status
              </h3>
              <p className="text-xs text-slate-500">
                Enter your Grievance Tracking ID to review updates made by our compliance team.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Grievance Tracking ID *
                </label>
                <input
                  type="text"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  placeholder="e.g. GRV-2026-A1B2C3"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={trackPhone}
                  onChange={(e) => setTrackPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {trackingError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{trackingError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={trackingLoading}
                className="w-full py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {trackingLoading ? 'Checking...' : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Check Status</span>
                  </>
                )}
              </button>
            </form>

            {trackingResult && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-900">
                    {trackingResult.grievanceId}
                  </span>
                  <Badge variant={getStatusBadgeVariant(trackingResult.status)}>
                    {trackingResult.status}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-slate-900">
                    {trackingResult.subject}
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Category: {trackingResult.category} &bull; Submitted on:{' '}
                    {new Date(trackingResult.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {trackingResult.internalNotes && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 block">Resolution Status / Notes:</span>
                    <p>{trackingResult.internalNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
