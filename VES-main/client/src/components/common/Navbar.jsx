import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  PhoneCall,
  UserCheck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export const Navbar = ({ onOpenEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Colleges & Universities', path: '/colleges' },
    { name: 'Courses', path: '/courses' },
    { name: 'Social Work', path: '/social-work' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Grievance', path: '/grievance' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand-900 text-accent-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="block font-display font-extrabold text-lg sm:text-xl text-brand-900 tracking-tight leading-none group-hover:text-brand-700 transition-colors">
              Vidhya Advance
            </span>
            <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
              Education Consultancy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'text-brand-900 bg-brand-50 font-semibold'
                    : 'text-slate-600 hover:text-brand-900 hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-50 text-brand-900 border border-brand-200 hover:bg-brand-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-brand-700" />
              <span>Admin Portal ({user?.name?.split(' ')[0]})</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="text-xs font-semibold text-slate-500 hover:text-brand-900 transition-colors px-2 py-1"
            >
              Admin Login
            </Link>
          )}

          <Link
            to="/enquiry"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Apply / Enquire Now</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/enquiry"
            className="px-3 py-1.5 text-xs font-semibold bg-accent-600 text-white rounded-lg shadow-sm"
          >
            Enquire
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-brand-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/enquiry"
              className="w-full text-center py-3 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Start Admission Enquiry
            </Link>

            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="w-full text-center py-2.5 rounded-xl bg-brand-50 text-brand-900 font-semibold text-xs border border-brand-200"
              >
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="w-full text-center py-2 text-xs text-slate-500 hover:text-slate-900"
              >
                Staff / Admin Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
