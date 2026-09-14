import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  GraduationCap,
  Building,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Search,
  Phone,
  Mail,
  ChevronDown,
  Sparkles,
  MapPin,
  ExternalLink,
  HelpCircle,
  HeartHandshake,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { CardSkeleton } from '../../components/common/SkeletonLoader.jsx';

export const Home = () => {
  const { openEnquiryModal } = useOutletContext();
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [socialActivities, setSocialActivities] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, coursesRes, faqsRes, socialRes] = await Promise.all([
          api.get('/colleges?limit=4&featured=true&active=true'),
          api.get('/courses?limit=6&featured=true&active=true'),
          api.get('/faqs?active=true'),
          api.get('/social-work?active=true'),
        ]);
        setColleges(collegesRes.data?.data || []);
        setCourses(coursesRes.data?.data || []);
        setFaqs(faqsRes.data?.data || []);
        setSocialActivities(socialRes.data?.data?.slice(0, 2) || []);
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setLoadingColleges(false);
        setLoadingCourses(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-600/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/80 border border-brand-700 text-accent-400 text-xs font-semibold backdrop-blur-sm shadow-inner">
                <Sparkles className="w-4 h-4 text-accent-400" />
                <span>Admission Guidance & Career Counselling &bull; Session 2026-27</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight sm:leading-tight">
                Shape Your Future With the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-amber-300">
                  Right Education
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Explore leading recognized universities and colleges, compare job-ready degree courses, and receive honest, personalized admission counselling from Vidhya Advance Education.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/enquiry"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-accent-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Start Your Admission Enquiry</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/colleges"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-800/80 hover:bg-brand-800 text-white border border-brand-700 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
                >
                  <Building className="w-4 h-4 text-accent-400" />
                  <span>Explore Colleges</span>
                </Link>
              </div>

              {/* Verified Trust Pillars */}
              <div className="pt-8 border-t border-brand-800/80 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-accent-400">100%</p>
                  <p className="text-xs text-slate-400 mt-0.5">Verified Guidance</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">40+</p>
                  <p className="text-xs text-slate-400 mt-0.5">Associated Institutions</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">0 Fee</p>
                  <p className="text-xs text-slate-400 mt-0.5">For Initial Counselling</p>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-2 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-900">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                    alt="Students consulting educational career counsellor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-brand-950/90 backdrop-blur-md border border-brand-800/80 text-white">
                    <div className="flex items-center gap-2 text-accent-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Dedicated Student Support</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Helping students make informed, confident choices in Engineering, Nursing, Management, Pharmacy & Medical streams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / VALUE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Admission Guidance',
              desc: 'Personalized step-by-step guidance on cutoffs, seat availability, document verification, and registration procedures.',
              icon: GraduationCap,
              color: 'text-accent-600 bg-accent-50',
            },
            {
              title: 'Career Counselling',
              desc: 'Aptitude mapping and interest evaluation to match students with the most suitable degree and future job prospects.',
              icon: Users,
              color: 'text-brand-600 bg-brand-50',
            },
            {
              title: 'University Selection',
              desc: 'Detailed comparisons of campuses, laboratory facilities, faculty credentials, and regulatory approvals.',
              icon: Building,
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              title: 'Course Guidance',
              desc: 'Clear breakdowns of B.Tech, Nursing, Pharmacy, MBA, and Paramedical curriculums, durations, and eligibility.',
              icon: BookOpen,
              color: 'text-purple-600 bg-purple-50',
            },
            {
              title: 'Student Support',
              desc: 'Dedicated assistance with scholarship discovery, hostel accommodations, transport facilities, and fee structures.',
              icon: ShieldCheck,
              color: 'text-sky-600 bg-sky-50',
            },
            {
              title: 'Transparency & Trust',
              desc: 'Zero false promises. Accurate statutory status verification with UGC, AICTE, PCI, and INC councils.',
              icon: Award,
              color: 'text-amber-600 bg-amber-50',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ADMISSION ENQUIRY QUICK CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-700">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-accent-400">
              Session 2026-2027 Admissions
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl">
              Confused About Which College or Course to Choose?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Speak directly with an experienced career counsellor. We will review your academic background and recommend the best colleges tailored to your goals.
            </p>
          </div>

          <button
            onClick={() => openEnquiryModal()}
            className="shrink-0 px-8 py-4 rounded-2xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-accent-600/30 transition-all transform hover:-translate-y-0.5"
          >
            Request Free Counselling Call
          </button>
        </div>
      </section>

      {/* 4. FEATURED COLLEGES & UNIVERSITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
              Partner Institutions
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 mt-1">
              Our Associated Colleges & Universities
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Explore leading universities in central India offering top-rated infrastructure, recognized programs, and dedicated placement cells.
            </p>
          </div>

          <Link
            to="/colleges"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-900 hover:text-brand-700 shrink-0"
          >
            <span>View All Institutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingColleges ? (
          <CardSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colleges.map((college) => (
              <div
                key={college._id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={college.coverImage || college.logo}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="accent">{college.type}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-white text-xs">
                      <MapPin className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                      <span className="truncate">{college.location?.city}, {college.location?.state}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-brand-900 transition-colors line-clamp-1">
                      {college.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {college.shortDescription || college.about}
                    </p>

                    {college.approvals?.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {college.approvals.slice(0, 2).map((app, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium truncate max-w-full"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-slate-100 mt-2">
                  <Link
                    to={`/colleges/${college.slug}`}
                    className="w-full text-center py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => openEnquiryModal(college._id)}
                    className="w-full text-center py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold transition-colors"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. POPULAR COURSES DIRECTORY */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
                Career Pathways
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 mt-1">
                Popular Degree Programs
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Discover accredited undergraduate and postgraduate programs across Engineering, Nursing, Pharmacy, Management, and Paramedical sciences.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-900 hover:text-brand-700 shrink-0"
            >
              <span>Browse All Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingCourses ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="primary">{course.degreeType}</Badge>
                      <span className="text-xs font-medium text-slate-500">{course.duration}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 line-clamp-2">
                      {course.name}
                    </h3>

                    <p className="text-xs text-brand-800 font-semibold flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      <span>{course.college?.name || 'Associated University'}</span>
                    </p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                      <p className="font-medium text-slate-800">Eligibility Criteria:</p>
                      <p className="line-clamp-2 leading-relaxed">{course.eligibility}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Admission Open</span>
                    </span>

                    <button
                      onClick={() => openEnquiryModal(course.college?._id, course._id)}
                      className="px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. AFFILIATION & ACCREDITATION INFORMATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-accent-700 bg-accent-50 px-3 py-1 rounded-full border border-accent-200">
              Understanding Educational Approvals
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Affiliation, Accreditation & Council Approvals Explained
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We help students clearly distinguish between statutory approvals, council recognitions, and grade accreditations before making an admission commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-display font-bold text-base text-brand-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
                <span>UGC Recognition</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                University Grants Commission approves universities under Section 2(f) and 12(B) of the UGC Act, 1956 to award valid academic degrees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-display font-bold text-base text-brand-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-600" />
                <span>AICTE Approval</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All India Council for Technical Education regulates standard technical and management programs (Engineering, MBA, MCA, Architecture).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-display font-bold text-base text-brand-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>INC & PCI Councils</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialized councils such as the Pharmacy Council of India (PCI) and Indian Nursing Council (INC) approve healthcare education infrastructure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-display font-bold text-base text-brand-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <span>NAAC Accreditation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                National Assessment and Accreditation Council evaluates institutional educational quality, faculty, infrastructure, and research standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW WE HELP STUDENTS (JOURNEY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
            Student-First Journey
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
            How Vidhya Advance Guides You
          </h2>
          <p className="text-sm text-slate-600">
            From your very first course inquiry to your confirmed campus admission:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: '01', title: 'Submit Enquiry', desc: 'Tell us about your qualification, preferred stream, location, and career goals.' },
            { step: '02', title: 'Free Counselling', desc: 'Our senior counsellor compares approved institutions matching your budget and aspirations.' },
            { step: '03', title: 'Eligibility Check', desc: 'We verify your academic marksheets and guide you through quota and scholarship options.' },
            { step: '04', title: 'Confirmed Admission', desc: 'Direct assistance with application submission, seat allotment, and hostel guidance.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <span className="text-4xl font-display font-black text-slate-100 absolute top-2 right-4 pointer-events-none">
                {item.step}
              </span>
              <div className="relative z-10 space-y-2">
                <span className="w-8 h-8 rounded-lg bg-brand-50 text-brand-900 font-bold text-xs flex items-center justify-center border border-brand-200">
                  {item.step}
                </span>
                <h3 className="font-display font-bold text-base text-slate-900 pt-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SOCIAL WELFARE PREVIEW */}
      <section className="bg-brand-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-accent-400">
                Community & Social Impact
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                Vidhya Advance Education Social Welfare Society
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Giving back to society through free educational profiling, rural awareness camps, and scholarship assistance for underserved students.
              </p>
            </div>

            <Link
              to="/social-work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-semibold text-xs border border-brand-700 transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-accent-400" />
              <span>Explore Initiatives</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialActivities.map((act) => (
              <div
                key={act._id}
                className="bg-brand-900/60 rounded-2xl overflow-hidden border border-brand-800/80 flex flex-col sm:flex-row shadow-lg"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto bg-brand-950">
                  <img
                    src={act.coverImage || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80'}
                    alt={act.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-3/5 p-6 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-accent-400 font-semibold">
                      {act.location} &bull; {new Date(act.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    </span>
                    <h3 className="font-display font-bold text-base text-white mt-1">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {act.impactSummary}
                    </p>
                  </div>
                  <Link
                    to="/social-work"
                    className="text-xs font-semibold text-accent-400 hover:text-accent-300 inline-flex items-center gap-1"
                  >
                    Read Impact Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
            Got Questions?
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Common questions students and parents ask regarding admission procedures and our counselling.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.slice(0, 5).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq._id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/faq"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-900 hover:text-brand-700"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 10. FINAL LEAD CONVERSION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-950 to-brand-900 text-white p-8 sm:p-14 overflow-hidden border border-brand-800 shadow-2xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl">
              Take the First Confident Step in Your Educational Career
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Don't navigate complex university applications alone. Our experienced counsellors are ready to support your admission application today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/enquiry"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm sm:text-base shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Submit Admission Enquiry
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base transition-colors border border-white/20"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
