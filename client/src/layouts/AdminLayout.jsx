import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Building2,
  BookOpen,
  MessageSquareWarning,
  HelpCircle,
  HeartHandshake,
  FileText,
  UserCog,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
  ShieldAlert,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { ProfileModal } from '../components/admin/ProfileModal.jsx';

export const AdminLayout = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const role = user?.role || 'COUNSELLOR';

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'COUNSELLOR', 'CONTENT_MANAGER'] },
    { name: 'Leads & Enquiries', path: '/admin/enquiries', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'COUNSELLOR'] },
    { name: 'Colleges & Universities', path: '/admin/colleges', icon: Building2, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { name: 'Courses Directory', path: '/admin/courses', icon: BookOpen, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { name: 'Grievance Redressal', path: '/admin/grievances', icon: MessageSquareWarning, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { name: 'FAQ Management', path: '/admin/faqs', icon: HelpCircle, roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'] },
    { name: 'Social Welfare', path: '/admin/social-work', icon: HeartHandshake, roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'] },
    { name: 'Website Content', path: '/admin/content', icon: FileText, roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'] },
    { name: 'Staff & Users', path: '/admin/admin-users', icon: UserCog, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { name: 'Security Audit Logs', path: '/admin/audit-logs', icon: History, roles: ['SUPER_ADMIN'] },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(role));

  // Verify permission for current route
  const currentRouteItem = menuItems.find((item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`));
  const isAuthorized = !currentRouteItem || currentRouteItem.roles.includes(role);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-brand-950 text-white p-4 flex items-center justify-between border-b border-brand-800">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-accent-400" />
          <span className="font-bold text-sm tracking-wide">VAE Admin Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-brand-900 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-950 text-slate-300 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-brand-800/80 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-900 text-accent-400 flex items-center justify-center border border-brand-700 shadow">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-extrabold text-white text-base leading-tight block">
                  Vidhya Advance
                </span>
                <span className="text-[10px] text-accent-400 font-semibold tracking-wider uppercase">
                  Management Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'bg-accent-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-brand-900/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-brand-800/80 space-y-3 bg-brand-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-800 text-white font-bold text-xs flex items-center justify-center border border-brand-700">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate max-w-[120px]">{user?.name}</p>
                <span className="inline-block text-[10px] text-accent-400 font-medium">
                  {user?.role?.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setProfileOpen(true)}
                className="text-slate-400 hover:text-accent-400 p-1.5 rounded-lg hover:bg-brand-900 transition-colors"
                title="Manage My Credentials & Password"
              >
                <KeyRound className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-brand-900 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-slate-300 text-xs font-medium transition-colors border border-brand-700/60"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-700" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Education Social Welfare Society Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">
              Signed in as: <strong className="text-slate-900">{user?.email}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-900 font-semibold">
              {user?.role}
            </span>
            <button
              onClick={() => setProfileOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors border border-slate-200"
              title="Change Password & Credentials"
            >
              <KeyRound className="w-3.5 h-3.5 text-brand-700" />
              <span>My Credentials</span>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {isAuthorized ? (
            <Outlet />
          ) : (
            <div className="max-w-lg mx-auto text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm my-8">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-xl text-slate-900">
                Access Restricted
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your assigned staff role (<strong className="text-slate-800">{role}</strong>) does not have sufficient permissions to view or edit this module.
              </p>
              <Link
                to="/admin/dashboard"
                className="inline-block px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs transition-colors"
              >
                Return to Dashboard
              </Link>
            </div>
          )}
        </main>
      </div>

      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
};
