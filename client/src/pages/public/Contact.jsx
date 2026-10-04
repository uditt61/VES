import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import {
  PAGE_SEO,
  localBusinessJsonLd,
  buildBreadcrumbJsonLd,
} from '../../utils/seoData.js';

// ─── Constants ───────────────────────────────────────────────────────────────

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/v5jJ3VyPxCWJcTJc9';

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ─── Main Component ──────────────────────────────────────────────────────────

export const Contact = () => {
  const { showToast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please fill in your name and phone number', 'error');
      return;
    }
    setFormSubmitted(true);
    showToast(
      'Your message has been received! Our counsellor will call you shortly.',
      'success'
    );
  };

  return (
    <div className="space-y-16 pb-16">
      <SEOHead
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        canonicalPath="/contact"
        jsonLd={[
          localBusinessJsonLd,
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Contact Us', url: '/contact' },
          ]),
        ]}
      />

      {/* ─── Header Banner ─── */}
      <section className="relative py-14 overflow-hidden text-white bg-brand-950 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[40rem] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-block text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800"
          >
            Reach Out
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Contact Vidhya Advance Education Social Welfare Society
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Our educational advisors are ready to guide you. Visit our office in
            Bhopal or reach out via phone, email, or online enquiry.
          </motion.p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ─── Contact Details Column ─── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
            >
              <h2 className="font-display font-bold text-2xl text-slate-900">
                Head Office &amp; Helpline
              </h2>

              <div className="space-y-4">
                {/* Address */}
                <motion.a
                  variants={fadeUp}
                  custom={1}
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5 rounded-2xl p-2 -m-2 transition-colors hover:bg-slate-50"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center shrink-0 border border-brand-200 transition-transform group-hover:scale-105">
                    <MapPin className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      Registered Office Address
                      <ExternalLink className="w-3 h-3 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Ward No. 59, Security Line, House No. 09, N-3 Sector,
                      Govindpura, BHEL, Bhopal, Madhya Pradesh 462023
                    </p>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 group-hover:underline">
                      <Navigation className="w-3 h-3" />
                      Open in Google Maps
                    </span>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.div
                  variants={fadeUp}
                  custom={2}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-800 flex items-center justify-center shrink-0 border border-accent-200">
                    <Phone className="w-5 h-5 text-accent-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Phone Numbers
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Helpline:{' '}
                      <a
                        href="tel:+919244292391"
                        className="text-brand-900 font-semibold hover:underline tabular-nums"
                      >
                        +91 9244292391
                      </a>
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Direct Mobile:{' '}
                      <a
                        href="tel:+919244292391"
                        className="text-brand-900 font-semibold hover:underline tabular-nums"
                      >
                        +91 9244292391
                      </a>
                    </p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  variants={fadeUp}
                  custom={3}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                    <Mail className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Email Enquiries
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 break-all">
                      Admissions:{' '}
                      <a
                        href="mailto:societyvidhya1964@gmail.com"
                        className="text-brand-900 font-semibold hover:underline"
                      >
                        societyvidhya1964@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>

                {/* Hours */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 border border-purple-200">
                    <Clock className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Counselling Desk Hours
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Monday &ndash; Saturday: 9:30 AM &ndash; 6:30 PM
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Sunday: Closed (Online enquiries monitored)
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ─── Live Map Card ─── */}
            <motion.a
              variants={fadeUp}
              custom={5}
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-slate-300 shadow-inner h-64"
              aria-label="Open office location in Google Maps"
            >
              {/* Map-style background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200" />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.15), transparent 45%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.15), transparent 45%)',
                }}
              />
              {/* Roads grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Pin */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 text-center p-4">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-brand-500/30 animate-ping" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-accent-400 shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Govindpura, BHEL, Bhopal
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Central Madhya Pradesh Educational Hub
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brand-800 shadow-sm border border-slate-200 transition-all group-hover:bg-brand-900 group-hover:text-white">
                  <Navigation className="w-3 h-3" />
                  Open in Google Maps
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          </motion.div>

          {/* ─── Quick Contact Form ─── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest font-bold text-accent-700">
                  Send a Direct Message
                </span>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Leave Us an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Fill in your question and an advisor will contact you within
                  24 hours.
                </p>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center py-10 space-y-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">
                    Thank You!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your message has been sent to our admissions team. We will
                    call you back shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        message: '',
                      });
                    }}
                    className="mt-2 px-5 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Jain"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message or Course Inquiry
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Let us know what college, course, or admission question you have..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;