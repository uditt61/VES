import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  UserCheck,
  Building,
  BookOpen,
  Phone,
  Mail,
  X,
  Plus,
  Clock,
  CheckCircle,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { TableSkeleton } from '../../components/common/SkeletonLoader.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export const EnquiryManager = () => {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [enquiries, setEnquiries] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Detail Modal / Drawer state
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Form states in detail modal
  const [editStatus, setEditStatus] = useState('');
  const [editCounsellor, setEditCounsellor] = useState('');
  const [editFollowUpDate, setEditFollowUpDate] = useState('');

  // Load dropdown lists (colleges & counsellors)
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const [colRes, usersRes] = await Promise.all([
          api.get('/colleges?limit=100&active=true'),
          api.get('/admin/users'),
        ]);
        setColleges(colRes.data?.data || []);
        setCounsellors(usersRes.data?.data || []);
      } catch (err) {
        // Fallback
      }
    };
    loadMetadata();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 12,
      });
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);
      if (collegeFilter) params.append('college', collegeFilter);

      const { data } = await api.get(`/enquiries?${params.toString()}`);
      setEnquiries(data.data || []);
      setTotalPages(data.meta?.totalPages || 1);
      setTotalCount(data.meta?.total || 0);
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, statusFilter, collegeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEnquiries();
  };

  const handleOpenDetail = async (enquiryId) => {
    setDetailLoading(true);
    try {
      const { data } = await api.get(`/enquiries/${enquiryId}`);
      setSelectedEnquiry(data.data);
      setEditStatus(data.data.status);
      setEditCounsellor(data.data.assignedCounsellor?._id || '');
      setEditFollowUpDate(
        data.data.followUpDate ? new Date(data.data.followUpDate).toISOString().split('T')[0] : ''
      );
    } catch (err) {
      showToast('Failed to load enquiry details', 'error');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSaveEnquiryUpdates = async () => {
    if (!selectedEnquiry) return;
    setUpdatingStatus(true);
    try {
      const payload = {
        status: editStatus,
        assignedCounsellor: editCounsellor || null,
        followUpDate: editFollowUpDate ? new Date(editFollowUpDate).toISOString() : null,
      };

      const { data } = await api.patch(`/enquiries/${selectedEnquiry._id}`, payload);
      showToast('Lead updated successfully!', 'success');
      setSelectedEnquiry(data.data);
      // Refresh list
      fetchEnquiries();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update lead', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;

    try {
      const { data } = await api.post(`/enquiries/${selectedEnquiry._id}/notes`, {
        note: newNote.trim(),
      });
      setSelectedEnquiry({
        ...selectedEnquiry,
        notes: data.data,
      });
      setNewNote('');
      showToast('Note added to timeline', 'success');
    } catch (err) {
      showToast('Failed to add note', 'error');
    }
  };

  const handleExportCSV = async () => {
    try {
      showToast('Generating CSV export...', 'info');
      const response = await api.get('/enquiries/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Vidhya_Advance_Leads_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('CSV downloaded successfully!', 'success');
    } catch (err) {
      showToast('Failed to export CSV', 'error');
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'New':
        return 'accent';
      case 'Contacted':
        return 'primary';
      case 'Follow-up':
        return 'warning';
      case 'Interested':
        return 'purple';
      case 'Application Started':
        return 'primary';
      case 'Admission Completed':
        return 'success';
      case 'Not Interested':
        return 'danger';
      case 'Closed':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Admission Leads & Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage student inquiry pipeline, counsellor assignments, follow-ups, and status updates.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Leads (CSV)</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, phone, email, enquiry ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="">All Lead Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Interested">Interested</option>
              <option value="Application Started">Application Started</option>
              <option value="Admission Completed">Admission Completed</option>
              <option value="Not Interested">Not Interested</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={collegeFilter}
              onChange={(e) => {
                setCollegeFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="">All Target Institutions</option>
              {colleges.map((col) => (
                <option key={col._id} value={col._id}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-900 text-white font-semibold text-xs hover:bg-brand-800 transition-colors"
            >
              Filter
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Total matching records: <strong className="text-slate-800">{totalCount}</strong> leads
          </span>
          {(search || statusFilter || collegeFilter) && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                setCollegeFilter('');
                setPage(1);
              }}
              className="text-brand-900 font-semibold hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={8} cols={7} />
          </div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-2">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No enquiries found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No leads match your current query or filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Phone / Email</th>
                  <th className="p-4">Preferred University</th>
                  <th className="p-4">Preferred Course</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned Counsellor</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-brand-900">{lead.enquiryId}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{lead.studentName}</td>
                    <td className="p-4 text-slate-600">
                      <div>{lead.phone}</div>
                      {lead.email && <div className="text-[11px] text-slate-400">{lead.email}</div>}
                    </td>
                    <td className="p-4 text-slate-700 truncate max-w-[150px]">
                      {lead.preferredCollege?.name || 'Unspecified'}
                    </td>
                    <td className="p-4 text-slate-700 truncate max-w-[150px]">
                      {lead.preferredCourse?.name || 'Unspecified'}
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge>
                    </td>
                    <td className="p-4 text-slate-600">
                      {lead.assignedCounsellor?.name || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(lead._id)}
                        className="p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                        title="View and Manage Lead"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail & Timeline Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-900 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                    {selectedEnquiry.enquiryId}
                  </span>
                  <Badge variant={getStatusBadgeVariant(selectedEnquiry.status)}>
                    {selectedEnquiry.status}
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mt-2">
                  {selectedEnquiry.studentName}
                </h3>
                <p className="text-xs text-slate-400">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()} via {selectedEnquiry.source}
                </p>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student & Academic Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  Contact Information
                </span>
                <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                {selectedEnquiry.alternatePhone && <p><strong>Alt Phone:</strong> {selectedEnquiry.alternatePhone}</p>}
                <p><strong>Email:</strong> {selectedEnquiry.email || 'None'}</p>
                <p><strong>Location:</strong> {selectedEnquiry.city || 'N/A'}, {selectedEnquiry.state || 'N/A'}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  Academic Background
                </span>
                <p><strong>Qualification:</strong> {selectedEnquiry.highestQualification || 'N/A'}</p>
                <p><strong>Stream:</strong> {selectedEnquiry.stream || 'N/A'}</p>
                <p><strong>Percentage / CGPA:</strong> {selectedEnquiry.percentage || 'N/A'}</p>
                <p><strong>12th Year:</strong> {selectedEnquiry.twelfthPassingYear || 'N/A'}</p>
              </div>
            </div>

            <div className="p-4 bg-brand-50/60 rounded-2xl border border-brand-100 text-xs space-y-2">
              <span className="font-bold text-brand-900 block">Admission Preference</span>
              <p><strong>University:</strong> {selectedEnquiry.preferredCollege?.name || 'Unspecified'}</p>
              <p><strong>Program:</strong> {selectedEnquiry.preferredCourse?.name || 'Unspecified'}</p>
              {selectedEnquiry.message && <p className="pt-1 text-slate-600 italic">"{selectedEnquiry.message}"</p>}
            </div>

            {/* Lead Status & Assignment Controls */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <span className="font-bold text-xs text-slate-900 block">
                Update Lead Management Status
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Interested">Interested</option>
                    <option value="Application Started">Application Started</option>
                    <option value="Admission Completed">Admission Completed</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Assigned Counsellor</label>
                  <select
                    value={editCounsellor}
                    onChange={(e) => setEditCounsellor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">-- Unassigned --</option>
                    {counsellors.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={editFollowUpDate}
                    onChange={(e) => setEditFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleSaveEnquiryUpdates}
                  disabled={updatingStatus}
                  className="px-5 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  {updatingStatus ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {/* Timeline Notes */}
            <div className="space-y-4">
              <span className="font-bold text-xs text-slate-900 block">
                Counsellor Timeline & Notes ({selectedEnquiry.notes?.length || 0})
              </span>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedEnquiry.notes?.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No notes recorded for this lead yet.</p>
                ) : (
                  selectedEnquiry.notes?.map((n) => (
                    <div key={n._id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="font-semibold text-brand-900">{n.addedBy}</span>
                        <span>{new Date(n.addedAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700">{n.note}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type an internal remark, telephonic conversation note..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-semibold text-xs"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
