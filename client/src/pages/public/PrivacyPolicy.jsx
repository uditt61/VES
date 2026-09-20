import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-accent-700">
          Data Protection
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: Academic Session 2026-2027
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-6">
        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-900">1. Information We Collect</h2>
          <p>
            Vidhya Advance Education collects student contact details (Name, Phone Number, Email, City) and academic records (Highest qualification, marks percentage, passing year) exclusively when you fill out an admission enquiry or counselling form.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-900">2. How We Use Your Data</h2>
          <p>
            The information submitted is solely utilized by our authorized career advisors to evaluate university eligibility, contact you regarding course counselling, and facilitate your admission application with your selected institutions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-900">3. Student Data Protection & Privacy</h2>
          <p>
            We strictly do not sell, rent, or trade student personal records or contact numbers to third-party telemarketers. All student leads are stored securely with encrypted database connections and access controls restricted to authorized staff.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-900">4. Contact For Privacy Queries</h2>
          <p>
            If you wish to update or withdraw your contact consent at any time, please email us at <a href="mailto:privacy@vidhyaadvance.com" className="text-brand-900 font-semibold underline">privacy@vidhyaadvance.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
