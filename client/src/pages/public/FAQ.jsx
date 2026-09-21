import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle, ArrowRight, X } from 'lucide-react';
import api from '../../services/api.js';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import { PAGE_SEO, buildBreadcrumbJsonLd, buildFaqJsonLd } from '../../utils/seoData.js';

export const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    'All',
    'Admission',
    'Counselling',
    'Eligibility',
    'Documentation',
    'Fees & Scholarships',
    'General',
  ];

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ active: 'true' });
        if (selectedCategory && selectedCategory !== 'All') {
          params.append('category', selectedCategory);
        }
        if (search) {
          params.append('search', search);
        }

        const { data } = await api.get(`/faqs?${params.toString()}`);
        setFaqs(data.data || []);
      } catch (err) {
        console.error('Failed to load FAQs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [selectedCategory, search]);

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title={PAGE_SEO.faq.title}
        description={PAGE_SEO.faq.description}
        keywords={PAGE_SEO.faq.keywords}
        canonicalPath="/faq"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'FAQs', url: '/faq' },
          ]),
          ...(faqs.length > 0
            ? [buildFaqJsonLd(faqs.map(f => ({ question: f.question, answer: f.answer })))]
            : []),
        ]}
      />
      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            Support Center
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Have questions about universities, eligibility criteria, documentation, or our counselling process? Find instant answers below.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-7 top-7" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keywords (e.g. documentation, fees, scholarships, approval)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-7 top-7 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                (selectedCategory === '' && cat === 'All') || selectedCategory === cat
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        {loading ? (
          <div className="text-center py-12 text-sm text-slate-400">Loading questions...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No questions found</h3>
            <p className="text-xs text-slate-500">Try searching with a different term or clearing your category filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq._id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-accent-700 bg-accent-50 px-2 py-0.5 rounded border border-accent-200 inline-block">
                        {faq.category}
                      </span>
                      <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 pt-1">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions Box */}
        <div className="bg-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-200 text-center space-y-3">
          <h3 className="font-display font-bold text-lg text-slate-900">
            Still Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Our educational counsellors are available to address specific queries regarding cutoffs, syllabus details, and admission requirements.
          </p>
          <div className="pt-2">
            <Link
              to="/enquiry"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-900 text-white font-semibold text-xs shadow hover:bg-brand-800 transition-colors"
            >
              <span>Speak to a Counsellor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
