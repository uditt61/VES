import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const brandLogoVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Constants ───────────────────────────────────────────────────────────────

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/v5jJ3VyPxCWJcTJc9';

// ─── Data ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/colleges', label: 'Colleges & Universities' },
  { to: '/courses', label: 'Explore Courses' },
  { to: '/social-work', label: 'Social Welfare Society' },
  { to: '/faq', label: 'Frequently Asked Questions' },
  { to: '/grievance', label: 'Grievance Redressal' },
  { to: '/contact', label: 'Contact Us' },
];

// ✅ SIRF CLIENT KE BATAYE HUE COURSES (Purane wale hata diye)
const admissionLinks = [
  { to: '/courses?stream=Research', label: 'Ph.D in All Subjects' },
  { to: '/courses?stream=Medical', label: 'Medical (MBBS, BHMS, BAMS)' },
  { to: '/courses?stream=Polytechnic', label: 'Polytechnic (All Branches)' },
  { to: '/courses?stream=Engineering', label: 'Engineering (B.Tech)' },
  { to: '/courses?stream=Nursing', label: 'Nursing (B.Sc & GNM)' },
  { to: '/courses?stream=Pharmacy', label: 'Pharmacy (B.Pharm & D.Pharm)' },
  { to: '/courses?stream=Management', label: 'Management (MBA & BBA)' },
  { to: '/courses?stream=Paramedical', label: 'Paramedical Sciences' },
];

const legalLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
];

const bottomLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-and-conditions', label: 'Terms of Service' },
  { to: '/contact', label: 'Help & Support' },
];

const contactDetails = [
  {
    icon: MapPin,
    content: (
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-wrap items-start gap-1 transition-colors group hover:text-white"
        aria-label="Open office location in Google Maps"
      >
        <span>
          Ward No. 59, Security Line, House No. 09, N-3 Sector, Govindpura, BHEL,
          Bhopal, Madhya Pradesh 462023
        </span>
        <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-accent-400 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    ),
    align: 'items-start',
    iconClass: 'mt-0.5',
  },
  {
    icon: Phone,
    content: (
      <a
        href="tel:+919244292391"
        className="transition-colors tabular-nums hover:text-white"
      >
        +91 9244292391
      </a>
    ),
  },
  {
    icon: Mail,
    content: (
      <a
        href="mailto:societyvidhya1964@gmail.com"
        className="break-all transition-colors hover:text-white"
      >
        societyvidhya1964@gmail.com
      </a>
    ),
  },
  {
    icon: Clock,
    content: <span>Mon - Sat: 9:30 AM - 6:30 PM</span>,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionHeading = ({ children }) => (
  <h3 className="mb-4 text-sm font-bold tracking-wider text-white uppercase font-display">
    {children}
  </h3>
);

const FooterLink = ({ to, children, className = '' }) => (
  <motion.li variants={itemVariants}>
    <Link
      to={to}
      className={`inline-block transition-colors hover:text-accent-400 ${className}`}
    >
      {children}
    </Link>
  </motion.li>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-12 overflow-hidden border-t bg-brand-950 text-slate-300 border-brand-800/60">
      {/* Subtle decorative gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-accent-500/5 blur-3xl"
      />

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 gap-10 pb-12 border-b md:grid-cols-2 lg:grid-cols-5 border-brand-800/60"
        >
          {/* ── Brand Column ── */}
          <motion.div variants={columnVariants} className="space-y-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                variants={brandLogoVariants}
                src="/logoVES.png"
                alt="Vidhya Advance Education Society Logo"
                className="w-12 h-12 object-contain group-hover:scale-105 transition-transform shrink-0 drop-shadow-md"
              />
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white transition-colors font-display group-hover:text-accent-300">
                  Vidhya Advance
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-400">
                  Education Social Welfare Society
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Empowering students across India to make informed higher education
              choices. Vidhya Advance Education Social Welfare Society provides
              verified educational guidance, course counselling, and university
              discovery with complete transparency.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Dedicated to Ethical &amp; Student-First Educational Welfare
              </span>
            </div>
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.div variants={columnVariants}>
            <SectionHeading>Quick Links</SectionHeading>
            <motion.ul variants={listVariants} className="space-y-2.5 text-sm">
              {quickLinks.map(({ to, label }) => (
                <FooterLink key={to} to={to}>
                  {label}
                </FooterLink>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── Admissions ── */}
          <motion.div variants={columnVariants}>
            <SectionHeading>Admissions</SectionHeading>
            <motion.ul variants={listVariants} className="space-y-2.5 text-sm">
              <motion.li variants={itemVariants}>
                <Link
                  to="/enquiry"
                  className="inline-flex items-center gap-1 font-semibold transition-colors text-accent-400 hover:text-accent-300 group"
                >
                  Admission Enquiry
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.li>
              {admissionLinks.map(({ to, label }) => (
                <FooterLink key={to} to={to}>
                  {label}
                </FooterLink>
              ))}
              {legalLinks.map(({ to, label }) => (
                <FooterLink
                  key={to}
                  to={to}
                  className="text-xs text-slate-400"
                >
                  {label}
                </FooterLink>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── Contact Details ── */}
          <motion.div variants={columnVariants}>
            <SectionHeading>Head Office</SectionHeading>
            <motion.ul
              variants={listVariants}
              className="space-y-3 text-sm text-slate-400"
            >
              {contactDetails.map(
                (
                  { icon: Icon, content, align = 'items-center', iconClass = '' },
                  idx
                ) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className={`flex gap-2.5 ${align}`}
                  >
                    <Icon
                      className={`w-4 h-4 text-accent-400 shrink-0 ${iconClass}`}
                    />
                    {content}
                  </motion.li>
                )
              )}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col items-center justify-between gap-4 pt-8 text-xs sm:flex-row text-slate-400"
        >
          <p>
            &copy; {currentYear} Vidhya Advance Education Social Welfare
            Society. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {bottomLinks.map(({ to, label }, index) => (
              <React.Fragment key={to}>
                {index > 0 && <span>&bull;</span>}
                <Link to={to} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;