import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  PhoneCall,
  UserCheck,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { NavigationDrawer } from './NavigationDrawer.jsx';

export const Navbar = ({ onOpenEnquiry }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeoutRef = useRef(null);
  const location = useLocation();

  // Scroll detection for navbar background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Safe hover open handler
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDrawerOpen(true);
  };

  // Safe hover close handler with buffer to prevent accidental closing
  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // 300ms buffer ensures moving cursor between hamburger button and drawer panel is smooth
    closeTimeoutRef.current = setTimeout(() => {
      setDrawerOpen(false);
    }, 300);
  };

  const handleToggleClick = (e) => {
    e.preventDefault();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5'
            : 'bg-white border-b border-slate-100 py-3'
        }`}
      >
        {/* Leftmost Hamburger Button */}
        <div className="absolute left-3 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-[60]">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={handleToggleClick}
              className={`p-2.5 rounded-xl text-brand-900 border transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent-500 flex items-center justify-center ${
                drawerOpen
                  ? 'bg-brand-100/80 border-brand-300 shadow-inner'
                  : 'bg-slate-50 hover:bg-brand-50 border-slate-200 hover:border-brand-300'
              }`}
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={drawerOpen}
            >
              {/* 3 perfectly equal lines */}
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-brand-900 rounded-full block" />
                <span className="w-full h-0.5 bg-brand-900 rounded-full block" />
                <span className="w-full h-0.5 bg-brand-900 rounded-full block" />
              </div>
            </button>
          </div>
        </div>

        {/* Standard Page Container - keeps Vidhya Advance brand aligned with site layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-14 sm:pl-16 lg:pl-16 xl:pl-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-900 to-brand-950 text-accent-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 border border-brand-800 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="block font-display font-extrabold text-base sm:text-lg lg:text-xl text-brand-900 tracking-tight leading-none group-hover:text-brand-700 transition-colors">
                Vidhya Advance
              </span>
              <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
                Education Social Welfare Society
              </span>
            </div>
          </Link>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Direct Helpline on larger screens */}
            <a
              href="tel:+919821776333"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-brand-900 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="w-6 h-6 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <span className="tabular-nums">+91 9821776333</span>
            </a>

            {/* Primary Action Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/enquiry"
                className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                <UserCheck className="w-4 h-4" />
                <span>Apply / Enquire Now</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Component */}
      <NavigationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onOpenEnquiry={onOpenEnquiry}
      />
    </>
  );
};

export default Navbar;
