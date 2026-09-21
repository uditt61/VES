import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  BookOpen,
  Building,
  Clock,
  CheckCircle2,
  X,
  Filter,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { CardSkeleton } from '../../components/common/SkeletonLoader.jsx';

export const Courses = () => {
  const { openEnquiryModal } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStream = searchParams.get('stream') || '';

  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [stream, setStream] = useState(queryStream);
  const [collegeId, setCollegeId] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Sync stream state when query parameter changes (e.g. user clicks stream in Drawer or Footer)
  useEffect(() => {
    const currentStream = searchParams.get('stream') || '';
    setStream(currentStream);
    setPage(1);
  }, [searchParams]);

  // Load universities for filter dropdown
  useEffect(() => {
    const loadColleges = async () => {
      try {
        const { data } = await api.get('/colleges?limit=50&active=true');
        setColleges(data.data || []);
      } catch (err) {
        console.error('Failed to load colleges filter', err);
      }
    };
    loadColleges();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 9,
        active: 'true',
      });
      if (search) params.append('search', search);
      if (stream) params.append('stream', stream);
      if (collegeId) params.append('college', collegeId);

      const { data } = await api.get(`/courses?${params.toString()}`);
      setCourses(data.data || []);
      setTotalPages(data.meta?.totalPages || 1);
      setTotalCount(data.meta?.total || 0);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, stream, collegeId]);

  const handleStreamSelect = (selectedStream) => {
    setStream(selectedStream);
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (selectedStream) {
      newParams.set('stream', selectedStream);
    } else {
      newParams.delete('stream');
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCourses();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStream('');
    setCollegeId('');
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('stream');
    setSearchParams(newParams);
  };

  const streams = [
    'Engineering',
    'Nursing',
    'Pharmacy',
    'Management',
    'Paramedical',
    'Computer Applications',
    'Science',
    'Education',
    'Commerce',
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner with subtle animation */}
      <section className="bg-brand-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            Programs Directory
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Explore Courses & Degrees
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover accredited undergraduate, postgraduate, and diploma degree programs across top-rated universities in central India.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Stream Pills Quick Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleStreamSelect('')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              stream === ''
                ? 'bg-brand-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Streams
          </button>
          {streams.map((s) => (
            <button
              key={s}
              onClick={() => handleStreamSelect(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                stream.toLowerCase() === s.toLowerCase()
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Search & College Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search course name or keywords (e.g. B.Tech, Nursing)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={collegeId}
                onChange={(e) => {
                  setCollegeId(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="">All Associated Universities</option>
                {colleges.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex gap-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-900 text-white font-semibold text-sm hover:bg-brand-800 transition-colors"
              >
                Search
              </button>
              {(search || stream || collegeId) && (
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
              Showing <strong className="text-slate-800">{courses.length}</strong> of{' '}
              <strong className="text-slate-800">{totalCount}</strong> courses
              {stream && (
                <span className="ml-1 text-accent-700 font-semibold">
                  in stream "{stream}"
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Courses List */}
        {loading ? (
          <CardSkeleton count={6} />
        ) : courses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="font-display font-bold text-xl text-slate-800">No courses found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              No degree programs matched your search filters. Try clearing your filters or selecting a different stream.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="primary">{course.degreeType}</Badge>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 line-clamp-2">
                    {course.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-900">
                    <Building className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="truncate">{course.college?.name || 'Associated Institution'}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800">Eligibility Requirements:</p>
                    <p className="leading-relaxed">{course.eligibility}</p>
                  </div>

                  {course.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Admission Open</span>
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openEnquiryModal(course.college?._id, course._id)}
                    className="px-5 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Enquire Now
                  </motion.button>
                </div>
              </motion.div>
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

export default Courses;
