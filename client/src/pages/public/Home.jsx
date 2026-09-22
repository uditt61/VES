import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import Catalog from '../../components/common/Catalog.jsx';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import { PAGE_SEO, organizationJsonLd, websiteJsonLd, buildBreadcrumbJsonLd } from '../../utils/seoData.js';
import TradeMark from '../../components/common/TradeMark.jsx';
import Director from '../../components/common/Director.jsx';

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
    <div className="pb-16 space-y-20">
      <SEOHead
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        canonicalPath="/"
        jsonLd={[
          organizationJsonLd,
          websiteJsonLd,
          buildBreadcrumbJsonLd([{ name: 'Home', url: '/' }]),
        ]}
      />
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden text-white bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-600/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6 text-center lg:col-span-7 lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/80 border border-brand-700 text-accent-400 text-xs font-semibold backdrop-blur-sm shadow-inner">
                <Sparkles className="w-4 h-4 text-accent-400" />
                <span>Admission Guidance & Career Counselling &bull; Session 2026-27</span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white font-display sm:text-5xl lg:text-6xl sm:leading-tight">
                Shape Your Future With the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-amber-300">
                  Right Education
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-base leading-relaxed sm:text-lg text-slate-300 lg:mx-0">
                Explore leading recognized universities and colleges, compare job-ready degree courses, and receive honest, personalized educational guidance from Vidhya Advance Education Social Welfare Society.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    to="/enquiry"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-accent-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Start Your Admission Enquiry</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    to="/colleges"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-800/80 hover:bg-brand-800 text-white border border-brand-700 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
                  >
                    <Building className="w-4 h-4 text-accent-400" />
                    <span>Explore Colleges</span>
                  </Link>
                </motion.div>
              </div>

              {/* Verified Trust Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-8 text-center border-t border-brand-800/80 sm:text-left">
                <div>
                  <p className="text-xl font-bold font-display sm:text-2xl text-accent-400">100%</p>
                  <p className="text-xs text-slate-400 mt-0.5">Verified Guidance</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white font-display sm:text-2xl">40+</p>
                  <p className="text-xs text-slate-400 mt-0.5">Associated Institutions</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white font-display sm:text-2xl">0 Fee</p>
                  <p className="text-xs text-slate-400 mt-0.5">For Initial Counselling</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="p-2 border shadow-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-md border-white/10">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-900">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                    alt="Students consulting educational career counsellor"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
                  <div className="absolute p-4 text-white border bottom-4 left-4 right-4 rounded-xl bg-brand-950/90 backdrop-blur-md border-brand-800/80">
                    <div className="flex items-center gap-2 mb-1 text-xs font-semibold tracking-wider uppercase text-accent-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Dedicated Student Support</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Helping students make informed, confident choices in Engineering, Nursing, Management, Pharmacy & Medical streams.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TradeMark />
      <Catalog />
      <Director />

      {/* 2. TRUST / VALUE SECTION */}
      <section className="relative z-20 px-4 mx-auto -mt-16 max-w-7xl sm:px-6 lg:px-8 sm:-mt-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between p-6 transition-all duration-200 bg-white border rounded-2xl border-slate-100 shadow-card hover:shadow-card-hover group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold transition-colors font-display text-slate-900 group-hover:text-brand-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. ADMISSION ENQUIRY QUICK CTA BANNER */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between gap-8 p-8 text-white border shadow-xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 rounded-3xl sm:p-12 md:flex-row border-brand-700"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold tracking-widest uppercase text-accent-400">
              Session 2026-2027 Admissions
            </span>
            <h2 className="text-2xl font-extrabold font-display sm:text-3xl">
              Confused About Which College or Course to Choose?
            </h2>
            <p className="max-w-xl text-sm text-slate-300">
              Speak directly with an experienced career counsellor. We will review your academic background and recommend the best colleges tailored to your goals.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => openEnquiryModal()}
            className="shrink-0 px-8 py-4 rounded-2xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-accent-600/30 transition-all"
          >
            Request Free Counselling Call
          </motion.button>
        </motion.div>
      </section>

      {/* 4. FEATURED COLLEGES & UNIVERSITIES */}
      <section className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-brand-600">
              Partner Institutions
            </span>
            <h2 className="mt-1 text-2xl font-extrabold font-display sm:text-4xl text-slate-900">
              Our Associated Colleges & Universities
            </h2>
            <p className="max-w-2xl mt-2 text-sm text-slate-600">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {colleges.map((college, idx) => (
              <motion.div
                key={college._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-200/80 hover:shadow-xl group"
              >
                <div>
                  <div className="relative overflow-hidden h-44 bg-slate-100">
                    <img
                      src={college.coverImage || college.logo}
                      alt={college.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
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
                    <h3 className="text-base font-bold transition-colors font-display text-slate-900 group-hover:text-brand-900 line-clamp-1">
                      {college.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
                      {college.shortDescription || college.about}
                    </p>

                    {college.approvals?.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {college.approvals.slice(0, 2).map((app, appIdx) => (
                          <span
                            key={appIdx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium truncate max-w-full"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-5 pt-0 mt-2 border-t border-slate-100">
                  <Link
                    to={`/colleges/${college.slug}`}
                    className="w-full py-2 text-xs font-semibold text-center transition-colors rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => openEnquiryModal(college._id)}
                    className="w-full py-2 text-xs font-semibold text-center text-white transition-colors rounded-xl bg-brand-900 hover:bg-brand-800"
                  >
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 5. POPULAR COURSES DIRECTORY */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200/60">
        <div className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-600">
                Career Pathways
              </span>
              <h2 className="mt-1 text-2xl font-extrabold font-display sm:text-4xl text-slate-900">
                Popular Degree Programs
              </h2>
              <p className="max-w-xl mt-2 text-sm text-slate-600">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, idx) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col justify-between p-6 transition-all bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="primary">{course.degreeType}</Badge>
                      <span className="text-xs font-medium text-slate-500">{course.duration}</span>
                    </div>

                    <h3 className="text-base font-bold font-display text-slate-900 line-clamp-2">
                      {course.name}
                    </h3>

                    <p className="text-xs text-brand-800 font-semibold flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      <span>{course.college?.name || 'Associated University'}</span>
                    </p>

                    <div className="p-3 space-y-1 text-xs border bg-slate-50 rounded-xl border-slate-100 text-slate-600">
                      <p className="font-medium text-slate-800">Eligibility Criteria:</p>
                      <p className="leading-relaxed line-clamp-2">{course.eligibility}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Admission Open</span>
                    </span>

                    <button
                      onClick={() => openEnquiryModal(course.college?._id, course._id)}
                      className="px-4 py-2 text-xs font-semibold text-white transition-colors shadow-sm rounded-xl bg-accent-600 hover:bg-accent-700"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. AFFILIATION & ACCREDITATION INFORMATION SECTION */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 space-y-8 bg-white border shadow-sm rounded-3xl border-slate-200/80 sm:p-12"
        >
          <div className="max-w-3xl mx-auto space-y-3 text-center">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase border rounded-full text-accent-700 bg-accent-50 border-accent-200">
              Understanding Educational Approvals
            </span>
            <h2 className="text-2xl font-extrabold font-display sm:text-3xl text-slate-900">
              Affiliation, Accreditation & Council Approvals Explained
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              We help students clearly distinguish between statutory approvals, council recognitions, and grade accreditations before making an admission commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-5 space-y-2 border rounded-2xl bg-slate-50 border-slate-100">
              <div className="flex items-center gap-2 text-base font-bold font-display text-brand-950">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
                <span>UGC Recognition</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                University Grants Commission approves universities under Section 2(f) and 12(B) of the UGC Act, 1956 to award valid academic degrees.
              </p>
            </div>

            <div className="p-5 space-y-2 border rounded-2xl bg-slate-50 border-slate-100">
              <div className="flex items-center gap-2 text-base font-bold font-display text-brand-950">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-600" />
                <span>AICTE Approval</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                All India Council for Technical Education regulates standard technical and management programs (Engineering, MBA, MCA, Architecture).
              </p>
            </div>

            <div className="p-5 space-y-2 border rounded-2xl bg-slate-50 border-slate-100">
              <div className="flex items-center gap-2 text-base font-bold font-display text-brand-950">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>INC & PCI Councils</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Specialized councils such as the Pharmacy Council of India (PCI) and Indian Nursing Council (INC) approve healthcare education infrastructure.
              </p>
            </div>

            <div className="p-5 space-y-2 border rounded-2xl bg-slate-50 border-slate-100">
              <div className="flex items-center gap-2 text-base font-bold font-display text-brand-950">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <span>NAAC Accreditation</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                National Assessment and Accreditation Council evaluates institutional educational quality, faculty, infrastructure, and research standards.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. HOW WE HELP STUDENTS (JOURNEY) */}
      <section className="px-4 mx-auto space-y-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-2 text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-600">
            Student-First Journey
          </span>
          <h2 className="text-2xl font-extrabold font-display sm:text-4xl text-slate-900">
            How Vidhya Advance Education Social Welfare Society Guides You
          </h2>
          <p className="text-sm text-slate-600">
            From your very first course inquiry to your confirmed campus admission:
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            { step: '01', title: 'Submit Enquiry', desc: 'Tell us about your qualification, preferred stream, location, and career goals.' },
            { step: '02', title: 'Free Counselling', desc: 'Our senior counsellor compares approved institutions matching your budget and aspirations.' },
            { step: '03', title: 'Eligibility Check', desc: 'We verify your academic marksheets and guide you through quota and scholarship options.' },
            { step: '04', title: 'Confirmed Admission', desc: 'Direct assistance with application submission, seat allotment, and hostel guidance.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative flex flex-col justify-between p-6 overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200/80"
            >
              <span className="absolute text-4xl font-black pointer-events-none font-display text-slate-100 top-2 right-4">
                {item.step}
              </span>
              <div className="relative z-10 space-y-2">
                <span className="flex items-center justify-center w-8 h-8 text-xs font-bold border rounded-lg bg-brand-50 text-brand-900 border-brand-200">
                  {item.step}
                </span>
                <h3 className="pt-2 text-base font-bold font-display text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. SOCIAL WELFARE PREVIEW */}
      <section className="py-16 text-white bg-brand-950">
        <div className="px-4 mx-auto space-y-10 max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest uppercase text-accent-400">
                Community & Social Impact
              </span>
              <h2 className="text-2xl font-extrabold text-white font-display sm:text-4xl">
                Vidhya Advance Education Social Welfare Society
              </h2>
              <p className="max-w-xl text-sm text-slate-300">
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {socialActivities.map((act) => (
              <motion.div
                key={act._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col overflow-hidden border shadow-lg bg-brand-900/60 rounded-2xl border-brand-800/80 sm:flex-row"
              >
                <div className="h-48 sm:w-2/5 sm:h-auto bg-brand-950">
                  <img
                    src={act.coverImage || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80'}
                    alt={act.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 space-y-3 sm:w-3/5">
                  <div>
                    <span className="text-[11px] text-accent-400 font-semibold">
                      {act.location} &bull; {new Date(act.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-white font-display">
                      {act.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-3">
                      {act.impactSummary}
                    </p>
                  </div>
                  <Link
                    to="/social-work"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300"
                  >
                    Read Impact Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl px-4 mx-auto space-y-8 sm:px-6 lg:px-8">
        <div className="space-y-2 text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-600">
            Got Questions?
          </span>
          <h2 className="text-2xl font-extrabold font-display sm:text-4xl text-slate-900">
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
                className="overflow-hidden transition-all duration-200 bg-white border rounded-2xl border-slate-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full gap-4 p-5 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="text-sm font-bold font-display sm:text-base text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pt-1 pb-5 text-sm leading-relaxed border-t text-slate-600 border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center">
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
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-8 space-y-6 overflow-hidden text-center text-white border shadow-2xl rounded-3xl bg-gradient-to-r from-brand-950 to-brand-900 sm:p-14 border-brand-800"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold font-display sm:text-4xl">
              Take the First Confident Step in Your Educational Career
            </h2>
            <p className="text-sm leading-relaxed sm:text-base text-slate-300">
              Don't navigate complex university applications alone. Our experienced counsellors are ready to support your admission application today.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/enquiry"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm sm:text-base shadow-xl transition-all flex items-center justify-center"
              >
                Submit Admission Enquiry
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="w-full py-4 text-sm font-semibold text-white transition-colors border sm:w-auto px-7 rounded-2xl bg-white/10 hover:bg-white/20 sm:text-base border-white/20 flex items-center justify-center"
              >
                Contact Our Office
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
