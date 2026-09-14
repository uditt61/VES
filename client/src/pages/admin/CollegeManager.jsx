import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  MapPin,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { ConfirmModal } from '../../components/common/ConfirmModal.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export const CollegeManager = () => {
  const { showToast } = useToast();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Delete Confirm Modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'University',
    logo: '',
    coverImage: '',
    shortDescription: '',
    about: '',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    address: '',
    pinCode: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    affiliationsStr: 'UGC Recognized',
    approvalsStr: 'AICTE, PCI',
    isFeatured: false,
    isActive: true,
  });

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 100 });
      if (search) params.append('search', search);

      const { data } = await api.get(`/colleges?${params.toString()}`);
      setColleges(data.data || []);
    } catch (err) {
      showToast('Failed to load institutions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [search]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      name: '',
      slug: '',
      type: 'University',
      logo: '',
      coverImage: '',
      shortDescription: '',
      about: '',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      address: '',
      pinCode: '',
      website: '',
      contactEmail: '',
      contactPhone: '',
      affiliationsStr: 'UGC Recognized',
      approvalsStr: 'AICTE, PCI',
      isFeatured: false,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (college) => {
    setIsEditing(true);
    setCurrentId(college._id);
    setFormData({
      name: college.name,
      slug: college.slug,
      type: college.type || 'University',
      logo: college.logo || '',
      coverImage: college.coverImage || '',
      shortDescription: college.shortDescription || '',
      about: college.about || '',
      city: college.location?.city || '',
      state: college.location?.state || '',
      address: college.location?.address || '',
      pinCode: college.location?.pinCode || '',
      website: college.website || '',
      contactEmail: college.contactEmail || '',
      contactPhone: college.contactPhone || '',
      affiliationsStr: (college.affiliations || []).join(', '),
      approvalsStr: (college.approvals || []).join(', '),
      isFeatured: college.isFeatured || false,
      isActive: college.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        type: formData.type,
        logo: formData.logo,
        coverImage: formData.coverImage,
        shortDescription: formData.shortDescription,
        about: formData.about,
        location: {
          city: formData.city,
          state: formData.state,
          address: formData.address,
          pinCode: formData.pinCode,
        },
        website: formData.website,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        affiliations: formData.affiliationsStr
          ? formData.affiliationsStr.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        approvals: formData.approvalsStr
          ? formData.approvalsStr.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
      };

      if (isEditing) {
        await api.patch(`/colleges/${currentId}`, payload);
        showToast('Institution updated successfully!', 'success');
      } else {
        await api.post('/colleges', payload);
        showToast('Institution created successfully!', 'success');
      }

      setModalOpen(false);
      fetchColleges();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await api.delete(`/colleges/${deleteTargetId}`);
      showToast('Institution deactivated successfully', 'success');
      setConfirmOpen(false);
      setDeleteTargetId(null);
      fetchColleges();
    } catch (err) {
      showToast('Failed to delete institution', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Colleges & Universities Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add, update, or deactivate affiliated academic partner institutions.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Institution</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter colleges by name, city, or approvals..."
          className="w-full text-xs focus:outline-none"
        />
      </div>

      {/* Institutions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading institutions...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Institution Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">City / State</th>
                  <th className="p-4">Approvals</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {colleges.map((col) => (
                  <tr key={col._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">
                      <div>{col.name}</div>
                      <span className="text-[11px] text-slate-400 font-mono font-normal">/colleges/{col.slug}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="primary">{col.type}</Badge>
                    </td>
                    <td className="p-4 text-slate-600">
                      {col.location?.city}, {col.location?.state}
                    </td>
                    <td className="p-4 text-slate-500 max-w-[200px] truncate">
                      {col.approvals?.join(', ') || 'None listed'}
                    </td>
                    <td className="p-4">
                      {col.isFeatured ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="p-4">
                      {col.isActive ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="neutral">Inactive</Badge>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(col)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Edit Institution"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTargetId(col._id);
                          setConfirmOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Deactivate Institution"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Institution Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-display font-bold text-xl text-slate-900">
                {isEditing ? 'Edit Institution' : 'Add New Institution'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institution Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="University">University</option>
                    <option value="College">College</option>
                    <option value="Institute">Institute</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary for cards (max 300 chars)..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed About Profile</label>
                <textarea
                  rows={3}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Approvals (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.approvalsStr}
                    onChange={(e) => setFormData({ ...formData, approvalsStr: e.target.value })}
                    placeholder="AICTE, PCI, INC, NMC"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Affiliations (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.affiliationsStr}
                    onChange={(e) => setFormData({ ...formData, affiliationsStr: e.target.value })}
                    placeholder="UGC Recognized, State Act"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Logo Image URL</label>
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">Active Listing</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-xl bg-brand-900 text-white font-semibold shadow hover:bg-brand-800"
                >
                  {submitting ? 'Saving...' : 'Save Institution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Deactivate Institution"
        message="Are you sure you want to deactivate this institution? It will no longer be visible to students in the public directory."
        confirmText="Deactivate"
        onConfirm={confirmDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
};
