import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Target,
  Compass,
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  Building,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import MoreWork from './MoreWork.jsx';

export const About = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            About Vidhya Advance Education
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Guiding Careers with Integrity, Transparency & Trust
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A dedicated educational consultancy connecting ambitious students with accredited colleges, universities, and professional degree programs across central India.
          </p>
        </div>
      </section>
<section>

  <MoreWork />
</section>
      {/* Overview & Who We Are */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
              Our Identity
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900">
              Bridging the Gap Between Student Potential and Educational Opportunity
            </h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                <strong>Vidhya Advance Education</strong> was founded with a singular purpose: to bring honesty, regulatory clarity, and structured career counselling to higher education admissions.
              </p>
              <p>
                With thousands of academic institutions and evolving degree options across Engineering, Management, Nursing, Pharmacy, and Paramedical sciences, students and families frequently encounter confusing marketing claims, unclear regulatory statuses, and opaque fee structures.
              </p>
              <p>
                We act as a trusted educational advisor—verifying statutory approvals (UGC, AICTE, INC, PCI), breaking down course curriculums, and helping students choose institutions that genuinely foster long-term career growth.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Verified Approvals</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Personalized Mentorship</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
                alt="Vidhya Advance Education counselling session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center border border-brand-200">
                <Compass className="w-6 h-6 text-brand-700" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To become the most reliable and student-centric higher education consultancy in central India, ensuring that every student makes informed, confident educational and career decisions backed by verified data and personal potential.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-accent-50 text-accent-800 flex items-center justify-center border border-accent-200">
                <Target className="w-6 h-6 text-accent-700" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To connect students with legitimate, approved educational institutions, provide comprehensive admission guidance, eliminate misleading promotional information, and support students from all socio-economic backgrounds through transparent counselling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
            Principles We Live By
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-slate-900">
            Our Core Values
          </h2>
          <p className="text-sm text-slate-600">
            Built on a solid foundation of student advocacy, regulatory integrity, and career stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h4 className="font-display font-bold text-lg text-slate-900">Student-First Ethics</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We prioritize the student's career aptitude and financial circumstance over institutional commercial interests.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <Award className="w-8 h-8 text-accent-600" />
            <h4 className="font-display font-bold text-lg text-slate-900">Verified Approvals Only</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never fabricate institutional accreditations, rankings, or placement numbers. All regulatory data is transparently cross-checked.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <HeartHandshake className="w-8 h-8 text-brand-700" />
            <h4 className="font-display font-bold text-lg text-slate-900">Social Responsibility</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Through our Social Welfare Society, we conduct free education awareness drives and assist underprivileged students in obtaining scholarship benefits.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="font-display font-bold text-2xl sm:text-3xl">
            Want to Discuss Your Higher Education Plan?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Our experienced educational advisors are here to answer your questions regarding admissions, eligibility, and scholarship programs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/enquiry"
              className="px-7 py-3 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Get Free Counselling</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
