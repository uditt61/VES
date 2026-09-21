import React, { useState, useEffect } from 'react';
import { UserCog, Plus, Edit2, Trash2, Shield, UserCheck, X, KeyRound, Copy, Check, Sparkles, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';
import { ConfirmModal } from '../../components/common/ConfirmModal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export const AdminUserManager = () => {
  const { showToast } = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Dedicated Reset Password Modal State
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [resetPasswordValue, setResetPasswordValue] = useState('');
  const [showResetPass, setShowResetPass] = useState(false);
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [copiedState, setCopiedState] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'COUNSELLOR',
    phone: '',
    isActive: true,
  });

  const generateRandomPassword = () => {
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercase = 'abcdefghijkmnopqrstuvwxyz';
    const numbers = '23456789';
    const symbols = '!@#$%&*';
    const all = uppercase + lowercase + numbers + symbols;

    let pass = '';
    pass += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    pass += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
    pass += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 4; i < 12; i++) {
      pass += all.charAt(Math.floor(Math.random() * all.length));
    }
    return pass.split('').sort(() => 0.5 - Math.random()).join('');
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.data || []);
    } catch (err) {
      showToast('Failed to load admin users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'COUNSELLOR',
      phone: '',
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (u) => {
    setIsEditing(true);
    setCurrentId(u._id);
    setFormData({
      name: u.name,
      email: u.email,
      password: '', // blank unless changing
      role: u.role,
      phone: u.phone || '',
      isActive: u.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...formData };
      if (isEditing && !payload.password) {
        delete payload.password;
      }

      if (isEditing) {
        await api.patch(`/admin/users/${currentId}`, payload);
        showToast('User account updated', 'success');
      } else {
        await api.post('/admin/users', payload);
        showToast('New user account created successfully', 'success');
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenReset = (u) => {
    setTargetUser(u);
    setResetPasswordValue('');
    setShowResetPass(false);
    setCopiedState(false);
    setResetModalOpen(true);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!targetUser) return;
    if (resetPasswordValue.length < 8) {
      showToast('New password must be at least 8 characters long', 'error');
      return;
    }

    setResetSubmitting(true);
    try {
      try {
        await api.post(`/admin/users/${targetUser._id}/reset-password`, {
          newPassword: resetPasswordValue,
        });
      } catch (postErr) {
        // If 404 (e.g. backend server process hasn't been restarted yet), fallback to PATCH
        if (postErr.response?.status === 404) {
          await api.patch(`/admin/users/${targetUser._id}`, {
            password: resetPasswordValue,
          });
        } else {
          throw postErr;
        }
      }
      showToast(`Password reset successfully for ${targetUser.email}`, 'success');
      setResetModalOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to reset password', 'error');
    } finally {
      setResetSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!targetUser || !resetPasswordValue) return;
    const text = `Vidhya Advance Education Social Welfare Society\nStaff Portal: ${window.location.origin}/admin/login\nEmail: ${targetUser.email}\nPassword: ${resetPasswordValue}`;
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    showToast('Credentials copied to clipboard!', 'success');
    setTimeout(() => setCopiedState(false), 2500);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await api.delete(`/admin/users/${deleteTargetId}`);
      showToast('User account deleted', 'success');
      setConfirmOpen(false);
      setDeleteTargetId(null);
      fetchUsers();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  const canManage = ['SUPER_ADMIN', 'ADMIN'].includes(currentUser?.role);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Staff & User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure administrative accounts, generate credentials, and reset passwords for counsellors and staff.
          </p>
        </div>

        {canManage && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Staff Credentials</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading user accounts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Last Login</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => {
                  const isSuperAdmin = u.role === 'SUPER_ADMIN';
                  const canModifyUser = currentUser?.role === 'SUPER_ADMIN' || !isSuperAdmin;

                  return (
                    <tr key={u._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{u.name}</td>
                      <td className="p-4 text-slate-600 font-mono">{u.email}</td>
                      <td className="p-4">
                        <Badge
                          variant={
                            u.role === 'SUPER_ADMIN'
                              ? 'purple'
                              : u.role === 'ADMIN'
                              ? 'primary'
                              : u.role === 'COUNSELLOR'
                              ? 'accent'
                              : 'neutral'
                          }
                        >
                          {u.role.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="p-4 text-slate-600">{u.phone || 'N/A'}</td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never'}
                      </td>
                      <td className="p-4">
                        {u.isActive ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="neutral">Deactivated</Badge>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        {canManage && canModifyUser && (
                          <>
                            {/* Reset Password Button */}
                            <button
                              onClick={() => handleOpenReset(u)}
                              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors inline-flex items-center gap-1 text-[11px] font-medium"
                              title="Reset Password"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                              <span className="hidden xl:inline">Reset Pass</span>
                            </button>

                            {/* Edit Profile Button */}
                            <button
                              onClick={() => handleOpenEdit(u)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="Edit User Details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete User (Super Admin only, cannot delete self) */}
                            {currentUser.role === 'SUPER_ADMIN' && currentUser.id !== u._id && (
                              <button
                                onClick={() => {
                                  setDeleteTargetId(u._id);
                                  setConfirmOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-display font-bold text-xl text-slate-900">
                {isEditing ? 'Edit User Profile' : 'Create Staff Credentials'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address (Login Username) *</label>
                <input
                  type="email"
                  required
                  disabled={isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="staff@vidhyaadvance.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 disabled:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-slate-700">
                    {isEditing ? 'New Password (Leave blank to keep unchanged)' : 'Initial Password *'}
                  </label>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, password: generateRandomPassword() })}
                      className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-accent-500" />
                      <span>Generate</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  required={!isEditing}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={isEditing ? '••••••••' : 'Min 8 characters'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="COUNSELLOR">COUNSELLOR</option>
                    <option value="CONTENT_MANAGER">CONTENT_MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                    {currentUser?.role === 'SUPER_ADMIN' && (
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9821776333"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="userActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded"
                />
                <label htmlFor="userActive" className="font-semibold text-slate-700 cursor-pointer">
                  Account Active (Able to sign in)
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
                  className="px-6 py-2 rounded-xl bg-brand-900 text-white font-semibold shadow hover:bg-brand-800 disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Credentials'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dedicated Reset Password Modal */}
      {resetModalOpen && targetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-tight">
                    Reset Staff Password
                  </h3>
                  <p className="text-[11px] text-slate-500">Set new credentials for staff account</p>
                </div>
              </div>
              <button
                onClick={() => setResetModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target User Info */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">{targetUser.name}</span>
                <span className="text-[10px] uppercase font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                  {targetUser.role}
                </span>
              </div>
              <p className="text-slate-500 font-mono text-[11px]">{targetUser.email}</p>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700">New Password *</label>
                  <button
                    type="button"
                    onClick={() => setResetPasswordValue(generateRandomPassword())}
                    className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-accent-500" />
                    <span>Generate Strong Password</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showResetPass ? 'text' : 'password'}
                    required
                    value={resetPasswordValue}
                    onChange={(e) => setResetPasswordValue(e.target.value)}
                    placeholder="Enter or generate min 8 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPass(!showResetPass)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showResetPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {resetPasswordValue && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="overflow-hidden mr-2">
                    <span className="text-[11px] text-slate-400 block">Copy login details:</span>
                    <span className="font-mono text-xs text-brand-900 font-semibold truncate block">
                      {resetPasswordValue}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCredentials}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    {copiedState ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setResetModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="px-5 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold shadow disabled:opacity-60 flex items-center gap-2"
                >
                  {resetSubmitting ? 'Saving Password...' : 'Apply New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Staff Account"
        message="Are you sure you want to permanently delete this staff member? All lead assignment records will remain intact."
        confirmText="Delete User"
        onConfirm={confirmDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
};
export default AdminUserManager;
