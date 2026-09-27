import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Search, Building, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { ConfirmModal } from '../../components/common/ConfirmModal.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.03, duration: 0.3 } }),
};

export const CourseManager = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [formData, setFormData] = useState({
    name: '', degreeType: 'B.Tech', stream: 'Engineering', college: '',
    duration: '4 Years', eligibility: '', description: '',
    admissionStatus: 'Open', isFeatured: false, isActive: true,
  });

  const loadColleges = async () => {
    try {
      const { data } = await api.get('/colleges?limit=100&active=true');
      setColleges(data.data || []);
      if (data.data?.length > 0 && !formData.college) {
        setFormData((prev) => ({ ...prev, college: data.data[0]._id }));
      }
    } catch (err) { /* Fallback */ }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 100 });
      if (search) params.append('search', search);
      if (collegeFilter) params.append('college', collegeFilter);
      const { data } = await api.get(`/courses?${params.toString()}`);
      setCourses(data.data || []);
    } catch (err) {
      showToast('Failed to load courses', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadColleges(); }, []);
  useEffect(() => { fetchCourses(); }, [search, collegeFilter]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      name: '', degreeType: 'B.Tech', stream: 'Engineering',
      college: colleges[0]?._id || '', duration: '4 Years',
      eligibility: '10+2 with PCM minimum 45%', description: '',
      admissionStatus: 'Open', isFeatured: false, isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setIsEditing(true);
    setCurrentId(course._id);
    setFormData({
      name: course.name, degreeType: course.degreeType, stream: course.stream,
      college: course.college?._id || course.college || '', duration: course.duration,
      eligibility: course.eligibility, description: course.description || '',
      admissionStatus: course.admissionStatus || 'Open',
      isFeatured: course.isFeatured || false, isActive: course.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.college) {
      showToast('Please select an associated institution', 'error');
      return;
    }
    setSubmitting(true);
    try {
      if (isEditing) {
        await api.patch(`/courses/${currentId}`, formData);
        showToast('Course updated successfully', 'success');
      } else {
        await api.post('/courses', formData);
        showToast('Course created successfully', 'success');
      }
      setModalOpen(false);
      fetchCourses();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await api.delete(`/courses/${deleteTargetId}`);
      showToast('Course deactivated successfully', 'success');
      setConfirmOpen(false);
      setDeleteTargetId(null);
      fetchCourses();
    } catch (err) {
      showToast('Failed to delete course', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Course & Program Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure degrees, eligibility requirements, associated universities, and admission status.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </motion.button>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3"
      >
        <div className="sm:col-span-7 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course name or stream..."
            className="w-full text-xs focus:outline-none"
          />
        </div>
        <div className="sm:col-span-5">
          <select
            value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white"
          >
            <option value="">All Associated Universities</option>
            {colleges.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Courses Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden"
      >
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading courses...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Course Name</th>
                  <th className="p-4">Degree</th>
                  <th className="p-4">Stream</th>
                  <th className="p-4">Associated University</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Admission</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {courses.map((course, i) => (
                    <motion.tr
                      key={course._id}
                      custom={i}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.9)' }}
                      className="transition-colors"
                    >
                      <td className="p-4 font-semibold text-slate-900 max-w-[200px] truncate">{course.name}</td>
                      <td className="p-4"><Badge variant="primary">{course.degreeType}</Badge></td>
                      <td className="p-4 text-slate-600">{course.stream}</td>
                      <td className="p-4 text-slate-700 truncate max-w-[160px]">{course.college?.name || 'N/A'}</td>
                      <td className="p-4 text-slate-600">{course.duration}</td>
                      <td className="p-4">
                        <span className={`text-[11px] font-semibold ${
                          course.admissionStatus === 'Open' ? 'text-emerald-600'
                            : course.admissionStatus === 'Upcoming' ? 'text-amber-600'
                            : 'text-slate-400'
                        }`}>
                          {course.admissionStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        {course.isActive ? <Badge variant="success">Active</Badge> : <Badge variant="neutral">Inactive</Badge>}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={() => handleOpenEdit(course)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Course"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={() => { setDeleteTargetId(course._id); setConfirmOpen(true); }}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Deactivate Course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Add / Edit Course Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden" animate="visible" exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden" animate="visible" exit="exit"
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-6 sm:p-8 pb-4 shrink-0">
                <h3 className="font-display font-bold text-xl text-slate-900">
                  {isEditing ? 'Edit Course' : 'Add New Course'}
                </h3>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs overflow-y-auto p-6 sm:p-8 pt-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Full Name *</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bachelor of Pharmacy (B.Pharm)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Associated University *</label>
                  <select
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="">-- Choose University --</option>
                    {colleges.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Degree Type *</label>
                    <input
                      type="text" required value={formData.degreeType}
                      onChange={(e) => setFormData({ ...formData, degreeType: e.target.value })}
                      placeholder="e.g. B.Tech, MBA, MBBS"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stream *</label>
                    <input
                      type="text" required value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      placeholder="e.g. Engineering, Nursing"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Duration *</label>
                    <input
                      type="text" required value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 4 Years"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Admission Status</label>
                    <select
                      value={formData.admissionStatus}
                      onChange={(e) => setFormData({ ...formData, admissionStatus: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Open">Open</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria *</label>
                  <input
                    type="text" required value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="e.g. 10+2 with PCB minimum 45% marks"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brief Description</label>
                  <textarea
                    rows={2} value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span className="font-semibold text-slate-700">Feature on Homepage</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span className="font-semibold text-slate-700">Active Listing</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    type="button" onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    type="submit" disabled={submitting}
                    className="px-6 py-2 rounded-xl bg-brand-900 text-white font-semibold shadow hover:bg-brand-800 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Save Course'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={confirmOpen}
        title="Deactivate Course"
        message="Are you sure you want to deactivate this degree program? Students will no longer see it in the courses directory."
        confirmText="Deactivate"
        onConfirm={confirmDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
};