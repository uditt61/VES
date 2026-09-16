import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Heart,
  ArrowUpRight,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-950 text-slate-300 pt-16 pb-12 border-t border-brand-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-800/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-900 text-accent-400 flex items-center justify-center border border-brand-700 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  Vidhya Advance
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-400">
                  Career Consultancy & Guidance
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering students across India to make informed higher education choices. We provide verified admission guidance, course counselling, and university discovery with complete transparency.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dedicated to Ethical & Student-First Educational Counselling</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-accent-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="hover:text-accent-400 transition-colors">
                  Colleges & Universities
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-accent-400 transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/social-work" className="hover:text-accent-400 transition-colors">
                  Social Welfare Society
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/grievance" className="hover:text-accent-400 transition-colors">
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4">
              Admissions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/enquiry" className="text-accent-400 font-semibold hover:text-accent-300 inline-flex items-center gap-1 transition-colors">
                  Admission Enquiry <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Engineering" className="hover:text-accent-400 transition-colors">
                  Engineering (B.Tech)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Nursing" className="hover:text-accent-400 transition-colors">
                  Nursing (B.Sc & GNM)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Pharmacy" className="hover:text-accent-400 transition-colors">
                  Pharmacy (B.Pharm & D.Pharm)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Management" className="hover:text-accent-400 transition-colors">
                  Management (MBA & BBA)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Paramedical" className="hover:text-accent-400 transition-colors">
                  Paramedical Sciences
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/privacy-policy" className="hover:text-accent-400 transition-colors text-xs text-slate-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-accent-400 transition-colors text-xs text-slate-400">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4">
              Head Office
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                <span>MP Nagar Zone-II, Bhopal, Madhya Pradesh - 462011</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                <a href="tel:+917554239876" className="hover:text-white transition-colors">
                  +91 755 4239876
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                <a href="mailto:admissions@vidhyaadvance.com" className="hover:text-white transition-colors">
                  admissions@vidhyaadvance.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-accent-400 shrink-0" />
                <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Vidhya Advance Education. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link to="/admin/login" className="hover:text-white transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
