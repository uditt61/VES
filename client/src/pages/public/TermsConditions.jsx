import React from 'react';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import { PAGE_SEO, buildBreadcrumbJsonLd } from '../../utils/seoData.js';

export const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <SEOHead
        title={PAGE_SEO.termsConditions.title}
        description={PAGE_SEO.termsConditions.description}
        keywords={PAGE_SEO.termsConditions.keywords}
        canonicalPath="/terms-and-conditions"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Terms & Conditions', url: '/terms-and-conditions' },
          ]),
        ]}
      />
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-accent-700">
          User Agreement
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500">
          Effective Date: Academic Session 2026-2027
        </p>
      </div>

      <div className="text-sm leading-relaxed text-slate-600 space-y-6">
        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-900">1. Educational Guidance & Scope</h2>
          <p>
            Vidhya Advance Education Social Welfare Society acts as an educational guidance facilitator and social welfare society. Final admission seat allotment, merit ranking, degree conferral, and examinations remain the sole prerogative of respective affiliated universities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-900">2. Accuracy of Student Information</h2>
          <p>
            Applicants are responsible for the authenticity of academic marks, certificates, and personal identity documents provided during counselling. Providing falsified or forged credentials invalidates admission guidance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-lg text-slate-900">3. Institutional Regulatory Information</h2>
          <p>
            All university affiliations and course approvals presented on this platform are sourced from published regulatory announcements. Students are also encouraged to review official statutory websites (e.g. UGC, AICTE, INC, PCI) during counselling.
          </p>
        </section>
      </div>
    </div>
  );
};
