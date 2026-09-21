import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Search,
  Building2,
  MapPin,
  Globe,
  Phone,
  CheckCircle2,
  ArrowRight,
  Filter,
  X,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { CardSkeleton } from '../../components/common/SkeletonLoader.jsx';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import { PAGE_SEO, buildBreadcrumbJsonLd } from '../../utils/seoData.js';

export const Colleges = () => {
  const { openEnquiryModal } = useOutletContext();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 8,
        active: 'true',
      });
      if (search) params.append('search', search);
      if (type) params.append('type', type);
      if (city) params.append('city', city);

      const { data } = await api.get(`/colleges?${params.toString()}`);
      setColleges(data.data || []);
      setTotalPages(data.meta?.totalPages || 1);
      setTotalCount(data.meta?.total || 0);
    } catch (err) {
      console.error('Failed to load colleges', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [page, type, city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchColleges();
  };

  const handleClearFilters = () => {
    setSearch('');
    setType('');
    setCity('');
    setPage(1);
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title={PAGE_SEO.colleges.title}
        description={PAGE_SEO.colleges.description}
        keywords={PAGE_SEO.colleges.keywords}
        canonicalPath="/colleges"
        jsonLd={[
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Colleges & Universities', url: '/colleges' },
          ]),
        ]}
      />
      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            Institutional Directory
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Affiliated Colleges & Universities
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover verified higher education institutions in central India. Compare academic infrastructure, statutory approvals, and available degree courses.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by university name, city or state..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="">All Types</option>
                <option value="University">Universities</option>
                <option value="College">Colleges</option>
                <option value="Institute">Institutes</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Bhopal)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="sm:col-span-2 flex gap-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-900 text-white font-semibold text-sm hover:bg-brand-800 transition-colors"
              >
                Search
              </button>
              {(search || type || city) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  title="Clear filters"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <strong className="text-slate-800">{colleges.length}</strong> of{' '}
              <strong className="text-slate-800">{totalCount}</strong> institutions
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <CardSkeleton count={6} />
        ) : colleges.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="font-display font-bold text-xl text-slate-800">No institutions found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't find any institutions matching your search query. Try clearing the filters or searching with a different term.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <div
                key={college._id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Banner */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={college.coverImage || college.logo}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="accent">{college.type}</Badge>
                      {college.isFeatured && <Badge variant="purple">Featured</Badge>}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-white text-xs">
                      <MapPin className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                      <span className="font-medium truncate">{college.location?.city}, {college.location?.state}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-900 transition-colors line-clamp-1">
                      {college.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {college.shortDescription || college.about}
                    </p>

                    {/* Approvals */}
                    {college.approvals?.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                          Approvals & Councils:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {college.approvals.slice(0, 3).map((app, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium truncate max-w-full"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3 border-t border-slate-100 mt-2">
                  <Link
                    to={`/colleges/${college.slug}`}
                    className="w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => openEnquiryModal(college._id)}
                    className="w-full text-center py-2.5 rounded-xl bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500 font-medium px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
