import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="pt-16 pb-12 border-t bg-brand-950 text-slate-300 border-brand-800/60">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 border-b md:grid-cols-2 lg:grid-cols-5 border-brand-800/60">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logoVES.png"
                alt="Vidhya Advance Education Society Logo"
                className="w-12 h-12 object-contain group-hover:scale-105 transition-transform shrink-0 drop-shadow-md"
              />
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white font-display group-hover:text-accent-300 transition-colors">
                  Vidhya Advance
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-400">
                  Education Social Welfare Society
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Empowering students across India to make informed higher education choices. Vidhya Advance Education Social Welfare Society provides verified educational guidance, course counselling, and university discovery with complete transparency.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dedicated to Ethical & Student-First Educational Welfare</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-white uppercase font-display">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-accent-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-accent-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="transition-colors hover:text-accent-400">
                  Colleges & Universities
                </Link>
              </li>
              <li>
                <Link to="/courses" className="transition-colors hover:text-accent-400">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/social-work" className="transition-colors hover:text-accent-400">
                  Social Welfare Society
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-accent-400">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/grievance" className="transition-colors hover:text-accent-400">
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-accent-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-white uppercase font-display">
              Admissions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/enquiry" className="inline-flex items-center gap-1 font-semibold transition-colors text-accent-400 hover:text-accent-300">
                  Admission Enquiry <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Engineering" className="transition-colors hover:text-accent-400">
                  Engineering (B.Tech)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Nursing" className="transition-colors hover:text-accent-400">
                  Nursing (B.Sc & GNM)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Pharmacy" className="transition-colors hover:text-accent-400">
                  Pharmacy (B.Pharm & D.Pharm)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Management" className="transition-colors hover:text-accent-400">
                  Management (MBA & BBA)
                </Link>
              </li>
              <li>
                <Link to="/courses?stream=Paramedical" className="transition-colors hover:text-accent-400">
                  Paramedical Sciences
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/privacy-policy" className="text-xs transition-colors hover:text-accent-400 text-slate-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-xs transition-colors hover:text-accent-400 text-slate-400">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-white uppercase font-display">
              Head Office
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
                <span> Ward No. 59, Security Line, House No. 09, N-3 Sector, Govindpura, BHEL, Bhopal, Madhya Pradesh 462023</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                <a href="tel:+919821776333" className="transition-colors hover:text-white tabular-nums">
                  +91 9821776333
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                <a href="mailto:abhishek.gupta5058@gmail.com" className="transition-colors hover:text-white">
                  abhishek.gupta5058@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-accent-400 shrink-0" />
                <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits - Completely removed public Admin/Staff link */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs sm:flex-row text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Vidhya Advance Education Social Welfare Society. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link to="/contact" className="transition-colors hover:text-white">
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
