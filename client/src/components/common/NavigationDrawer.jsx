import React, { useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  GraduationCap,
  Home,
  Info,
  Building2,
  BookOpen,
  HeartHandshake,
  HelpCircle,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  Activity,
  Briefcase,
  ExternalLink,
} from 'lucide-react';

export const NavigationDrawer = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
  onOpenEnquiry,
}) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const drawerRef = useRef(null);

  // Close drawer on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, location.search]);

  // Handle ESC key to close drawer and manage body scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const mainLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Colleges & Universities', path: '/colleges', icon: Building2 },
    { name: 'Explore Courses', path: '/courses', icon: BookOpen },
    { name: 'Social Welfare Society', path: '/social-work', icon: HeartHandshake },
    { name: 'Frequently Asked Questions', path: '/faq', icon: HelpCircle },
    { name: 'Grievance Redressal', path: '/grievance', icon: ShieldAlert },
    { name: 'Contact Us', path: '/contact', icon: PhoneCall },
  ];

  const admissionLinks = [
    {
      name: 'Admission Enquiry',
      path: '/enquiry',
      badge: 'Open',
      highlight: true,
      icon: Sparkles,
    },
    {
      name: 'Engineering (B.Tech)',
      path: '/courses?stream=Engineering',
      icon: GraduationCap,
    },
    {
      name: 'Nursing (B.Sc & GNM)',
      path: '/courses?stream=Nursing',
      icon: Activity,
    },
    {
      name: 'Pharmacy (B.Pharm & D.Pharm)',
      path: '/courses?stream=Pharmacy',
      icon: FileText,
    },
    {
      name: 'Management (MBA & BBA)',
      path: '/courses?stream=Management',
      icon: Briefcase,
    },
    {
      name: 'Paramedical Sciences',
      path: '/courses?stream=Paramedical',
      icon: Activity,
    },
  ];

  const drawerVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        damping: 26,
        stiffness: 260,
      },
    },
  };

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.035,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -14 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay - z-40 so it stays beneath the header and button to prevent hover flicker */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-brand-950/50 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Side Drawer Panel */}
          <motion.aside
            key="drawer-panel"
            ref={drawerRef}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="fixed top-0 left-0 bottom-0 z-50 h-full w-[320px] sm:w-[370px] max-w-[88vw] bg-white shadow-2xl flex flex-col border-r border-slate-200 outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Main Navigation Menu"
            tabIndex={-1}
          >
            {/* Header / Brand in Drawer */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white flex items-center justify-between shadow-sm">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-800 to-brand-900 border border-brand-700/60 text-accent-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-display font-extrabold text-base sm:text-lg text-white tracking-tight leading-none group-hover:text-accent-300 transition-colors">
                    Vidhya Advance
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-400 mt-1">
                    Education Social Welfare Society
                  </span>
                </div>
              </Link>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
              <motion.div
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="space-y-6"
              >
                {/* 1. Main Navigation Section */}
                <div>
                  <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Main Navigation
                  </div>
                  <nav className="space-y-1">
                    {mainLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive =
                        location.pathname === link.path &&
                        location.search === '';

                      return (
                        <motion.div key={link.path} variants={itemVariants}>
                          <NavLink
                            to={link.path}
                            onClick={onClose}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                              isActive
                                ? 'bg-brand-50 text-brand-900 font-semibold border-l-4 border-accent-500 shadow-sm'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-brand-900'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                className={`w-4 h-4 transition-colors ${
                                  isActive
                                    ? 'text-accent-600'
                                    : 'text-slate-400 group-hover:text-brand-700'
                                }`}
                              />
                              <span>{link.name}</span>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-150 ${
                                isActive
                                  ? 'text-accent-600 translate-x-0.5'
                                  : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5'
                              }`}
                            />
                          </NavLink>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                {/* 2. Admissions Section */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="px-3 pb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Admissions</span>
                    <span className="text-[10px] text-accent-600 font-semibold lowercase bg-accent-50 px-2 py-0.5 rounded-full">
                      2026-27
                    </span>
                  </div>
                  <div className="space-y-1">
                    {admissionLinks.map((link) => {
                      const Icon = link.icon;
                      const isCurrent =
                        `${location.pathname}${location.search}` === link.path;

                      return (
                        <motion.div key={link.path} variants={itemVariants}>
                          <Link
                            to={link.path}
                            onClick={onClose}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                              link.highlight
                                ? 'bg-gradient-to-r from-accent-50 to-amber-50/50 text-amber-950 border border-amber-200/80 font-semibold shadow-xs'
                                : isCurrent
                                ? 'bg-brand-50 text-brand-900 font-semibold border-l-4 border-accent-500'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-brand-900'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                className={`w-4 h-4 ${
                                  link.highlight
                                    ? 'text-accent-600'
                                    : isCurrent
                                    ? 'text-brand-900'
                                    : 'text-slate-400 group-hover:text-brand-700'
                                }`}
                              />
                              <span>{link.name}</span>
                            </div>
                            {link.badge ? (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent-600 text-white shadow-xs">
                                {link.badge}
                              </span>
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Legal / Policies */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Policies & Trust
                  </div>
                  <div className="space-y-1">
                    <motion.div variants={itemVariants}>
                      <Link
                        to="/privacy-policy"
                        onClick={onClose}
                        className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-brand-900 hover:bg-slate-50 transition-colors"
                      >
                        <span>Privacy Policy</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link
                        to="/terms-and-conditions"
                        onClick={onClose}
                        className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-brand-900 hover:bg-slate-50 transition-colors"
                      >
                        <span>Terms & Conditions</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Support & CTA Card */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-3">
              <Link
                to="/enquiry"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Admission Enquiry</span>
              </Link>

              {/* Helpline info */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/70 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <Phone className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                  <a
                    href="tel:+919821776333"
                    className="hover:text-accent-700 transition-colors font-semibold"
                  >
                    +91 9821776333
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                  <a
                    href="mailto:admissions@vidhyaadvance.com"
                    className="hover:text-slate-800 transition-colors truncate"
                  >
                    admissions@vidhyaadvance.com
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavigationDrawer;
