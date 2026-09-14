import React, { useState, useEffect } from 'react';
import {
  MessageSquareWarning,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export const GrievanceManager = () => {
  const { showToast } = useToast();
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [editStatus, setEditStatus] = useState('Open');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 100 });
      if (statusFilter) params.append('status', statusFilter);
      if (search) params.append('search', search);

      const { data } = await api.get(`/grievances?${params.toString()}`);
      setGrievances(data.data || []);
    } catch (err) {
      showToast('Failed to load grievances', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, [statusFilter, search]);

  const handleOpenDetail = (grv) => {
    setSelectedGrievance(grv);
    setEditStatus(grv.status);
    setEditNotes(grv.internalNotes || '');
  };

  const handleSaveResolution = async () => {
    if (!selectedGrievance) return;
    setSaving(true);
    try {
      const { data } = await api.patch(`/grievances/${selectedGrievance._id}`, {
        status: editStatus,
        internalNotes: editNotes,
      });
      showToast('Grievance status updated successfully', 'success');
      setSelectedGrievance(data.data);
      fetchGrievances();
    } catch (err) {
      showToast('Failed to update grievance', 'error');
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <Badge variant="primary">Open</Badge>;
      case 'Under Review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'In Progress':
        return <Badge variant="purple">In Progress</Badge>;
      case 'Resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'Closed':
        return <Badge variant="neutral">Closed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Grievance Redressal Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, investigate, and update resolution notes for student grievance submissions.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Tracking ID, student name, email, or subject..."
            className="w-full text-xs focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none bg-white"
          >
            <option value="">All Grievance Statuses</option>
            <option value="Open">Open</option>
            <option value="Under Review">Under Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading grievances...</div>
        ) : grievances.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-2">
            <MessageSquareWarning className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No grievances found</h3>
            <p className="text-xs text-slate-500">There are currently no active grievances matching your query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grievances.map((g) => (
                  <tr key={g._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-brand-900">{g.grievanceId}</td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {new Date(g.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-semibold text-slate-900">
                      <div>{g.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{g.phone}</div>
                    </td>
                    <td className="p-4 text-slate-800 max-w-[200px] truncate">{g.subject}</td>
                    <td className="p-4 text-slate-600">{g.category}</td>
                    <td className="p-4">{getStatusBadge(g.status)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(g)}
                        className="p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Investigate</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Resolution Modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-brand-900 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                  {selectedGrievance.grievanceId}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mt-2">
                  {selectedGrievance.subject}
                </h3>
                <p className="text-xs text-slate-400">
                  Filed by {selectedGrievance.name} ({selectedGrievance.phone}, {selectedGrievance.email})
                </p>
              </div>
              <button onClick={() => setSelectedGrievance(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-700 block">Student's Description:</span>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedGrievance.description}
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Update Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="Open">Open</option>
                  <option value="Under Review">Under Review</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Internal Notes & Official Resolution (Visible to Student on Tracking Page)
                </label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Details of action taken, documents verified, or counselling resolution provided..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedGrievance(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveResolution}
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-brand-900 text-white font-semibold text-xs shadow hover:bg-brand-800"
                >
                  {saving ? 'Saving...' : 'Update Grievance'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
