import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import { buildBreadcrumbJsonLd, buildCollegeJsonLd, SITE_SHORT_NAME } from '../../utils/seoData.js';

export const CollegeDetail = () => {
  const { slug } = useParams();
  const { openEnquiryModal } = useOutletContext();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/colleges/slug/${slug}`);
        setCollege(data.data);
      } catch (err) {
        setError('University or college not found or is currently inactive.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-800 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500">Loading university details & courses...</p>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="font-display font-bold text-2xl text-slate-900">Institution Not Found</h2>
        <p className="text-sm text-slate-500">{error || 'The requested institution does not exist.'}</p>
        <Link
          to="/colleges"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 text-white font-semibold text-xs"
        >
          <span>Back to College Directory</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <SEOHead
        title={`${college.name} Admission 2026 | ${SITE_SHORT_NAME}`}
        description={`Get admission guidance for ${college.name}${college.city ? ` in ${college.city}` : ''}. Explore courses, eligibility, fees & apply through Vidhya Advance Education Social Welfare Society.`}
        keywords={`${college.name} admission, ${college.name} courses, ${college.city || ''} university admission, ${college.name} fees, direct admission ${college.name}`}
        canonicalPath={`/colleges/${slug}`}
        jsonLd={[
          buildCollegeJsonLd(college),
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Colleges', url: '/colleges' },
            { name: college.name, url: `/colleges/${slug}` },
          ]),
        ]}
      />
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-brand-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/colleges" className="hover:text-brand-900">Colleges & Universities</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 font-semibold truncate">{college.name}</span>
        </nav>
      </div>

      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <div className="h-64 sm:h-80 w-full bg-slate-900 relative">
            <img
              src={college.coverImage || college.logo}
              alt={college.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
          </div>

          {/* Overlaid Institution Profile Header */}
          <div className="relative -mt-20 px-6 sm:px-10 pb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 z-10">
            <div className="flex items-start sm:items-end gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 border-2 border-white shadow-xl overflow-hidden shrink-0">
                <img
                  src={college.logo || college.coverImage}
                  alt={college.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="text-white space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{college.type}</Badge>
                  {college.isFeatured && <Badge variant="purple">Featured Partner</Badge>}
                </div>
                <h1 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
                  {college.name}
                </h1>
                <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-accent-400 shrink-0" />
                  <span>
                    {college.location?.city}, {college.location?.state} {college.location?.pinCode ? `- ${college.location?.pinCode}` : ''}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Official Website</span>
                </a>
              )}

              <button
                onClick={() => openEnquiryModal(college._id)}
                className="px-6 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Enquire About Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details & Courses */}
          <div className="lg:col-span-8 space-y-8">
            {/* About the Institution */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-700" />
                <span>About {college.name}</span>
              </h2>
              <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                <p>{college.about || college.shortDescription}</p>
                {college.location?.address && (
                  <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <strong>Campus Address:</strong> {college.location.address}, {college.location.city}, {college.location.state}
                  </p>
                )}
              </div>
            </div>

            {/* Regulatory Approvals & Affiliations */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Affiliations, Approvals & Statutory Recognitions</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {college.affiliations?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-brand-900 uppercase tracking-wider block">
                      University Affiliations
                    </span>
                    <ul className="space-y-1">
                      {college.affiliations.map((aff, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{aff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {college.approvals?.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-accent-900 uppercase tracking-wider block">
                      Council Approvals
                    </span>
                    <ul className="space-y-1">
                      {college.approvals.map((app, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Available Courses */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-700" />
                  <span>Available Courses & Programs ({college.courses?.length || 0})</span>
                </h2>
              </div>

              {college.courses?.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">
                  No courses listed for this institution yet. Contact our counselling desk for updated seat offerings.
                </p>
              ) : (
                <div className="space-y-4">
                  {college.courses?.map((course) => (
                    <div
                      key={course._id}
                      className="p-5 rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors space-y-3 bg-slate-50/50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="primary">{course.degreeType}</Badge>
                            <span className="text-xs text-slate-500 font-medium">{course.duration}</span>
                          </div>
                          <h3 className="font-display font-bold text-base text-slate-900 mt-1">
                            {course.name}
                          </h3>
                        </div>

                        <button
                          onClick={() => openEnquiryModal(college._id, course._id)}
                          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-colors shrink-0 shadow-xs"
                        >
                          Apply For Course
                        </button>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/60">
                        <p>
                          <strong className="text-slate-800">Eligibility:</strong> {course.eligibility}
                        </p>
                        {course.description && <p className="text-slate-500 leading-relaxed">{course.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Why Choose & Facilities */}
            {college.whyChooseUs?.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-600" />
                  <span>Why Choose {college.name}?</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {college.whyChooseUs.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Admission Card */}
            <div className="bg-gradient-to-b from-brand-950 to-brand-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-5 border border-brand-800 sticky top-24">
              <span className="text-[11px] uppercase tracking-wider font-bold text-accent-400">
                Direct Admission Desk
              </span>
              <h3 className="font-display font-bold text-xl">
                Ready to Apply at {college.name}?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive free counselling regarding cutoffs, seat allocations, fees, and documentation for academic session 2026-27.
              </p>

              <button
                onClick={() => openEnquiryModal(college._id)}
                className="w-full py-3.5 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Start Admission Enquiry
              </button>

              <div className="pt-4 border-t border-brand-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent-400" />
                  <span>Helpline: +91 755 4239876</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent-400" />
                  <span>admissions@vidhyaadvance.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
