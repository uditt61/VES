import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Clock,
  CheckCircle2,
  Building2,
  BookOpen,
  MessageSquareWarning,
  TrendingUp,
  ArrowRight,
  Shield,
  Filter,
} from 'lucide-react';
import api from '../../services/api.js';
import { Badge } from '../../components/common/Badge.jsx';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('/admin/dashboard/stats');
        setStats(data.data);
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  const metrics = stats?.metrics || {};
  const statusDistribution = stats?.statusDistribution || {};
  const monthlyTrends = stats?.monthlyTrends || [];
  const topColleges = stats?.topColleges || [];
  const recentEnquiries = stats?.recentEnquiries || [];

  const statCards = [
    { label: 'Total Enquiries', value: metrics.totalEnquiries || 0, icon: Users, color: 'text-brand-700 bg-brand-50 border-brand-200' },
    { label: 'New Unassigned Leads', value: metrics.newEnquiries || 0, icon: UserPlus, color: 'text-accent-700 bg-accent-50 border-accent-200' },
    { label: 'Scheduled Follow-ups', value: metrics.followUpEnquiries || 0, icon: Clock, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { label: 'Admissions Completed', value: metrics.admissionsCompleted || 0, icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  ];

  const secondaryCards = [
    { label: 'Active Universities', value: metrics.totalColleges || 0, icon: Building2, link: '/admin/colleges' },
    { label: 'Active Degree Courses', value: metrics.totalCourses || 0, icon: BookOpen, link: '/admin/courses' },
    { label: 'Open Grievances', value: metrics.openGrievances || 0, icon: MessageSquareWarning, link: '/admin/grievances' },
    { label: 'Lead Conversion Ratio', value: metrics.conversionRate || '0.0%', icon: TrendingUp, link: '/admin/enquiries' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Education Social Welfare Society Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time database metrics on admissions, guidance pipelines, and student inquiries.
          </p>
        </div>

        <Link
          to="/admin/enquiries"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs shadow-sm transition-colors self-start sm:self-auto"
        >
          <span>View Lead Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">{card.label}</span>
                <p className="font-display font-black text-2xl text-slate-900">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {secondaryCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              to={card.link}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-900 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 truncate">{card.label}</p>
                <p className="font-bold text-base text-slate-900">{card.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Status Pipeline Breakdown */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base text-slate-900">
            Enquiry Status Distribution Pipeline
          </h2>
          <span className="text-xs text-slate-500">Calculated from live leads</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {Object.entries(statusDistribution).map(([statusName, count]) => (
            <div key={statusName} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
                {statusName}
              </span>
              <p className="font-display font-extrabold text-lg text-slate-900">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Visualization */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-slate-900">
              Admission Enquiries by Month
            </h2>
            <span className="text-xs text-slate-400">Last 6 Months</span>
          </div>

          {monthlyTrends.length === 0 ? (
            <div className="h-44 flex items-center justify-center text-xs text-slate-400">
              No historical trend data yet. New submissions will populate here automatically.
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              {monthlyTrends.map((trend, idx) => {
                const maxCount = Math.max(...monthlyTrends.map((t) => t.count), 1);
                const percent = Math.min(100, Math.round((trend.count / maxCount) * 100));
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{trend.label}</span>
                      <span className="text-brand-900">{trend.count} enquiries</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-600 to-accent-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(percent, 8)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Colleges by Inquiries */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-slate-900">
              Top Institutions by Student Interest
            </h2>
          </div>

          <div className="space-y-2.5">
            {topColleges.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No student enquiries recorded yet.</p>
            ) : (
              topColleges.map((col, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{col.name}</span>
                  <span className="font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded border border-accent-200">
                    {col.count} {col.count === 1 ? 'Lead' : 'Leads'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900">
              Recent Admission Leads
            </h2>
            <p className="text-xs text-slate-500">Most recently registered student inquiries</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-brand-900 hover:text-brand-700 inline-flex items-center gap-1"
          >
            View All Leads <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Ref ID</th>
                <th className="p-4">Student</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Target College</th>
                <th className="p-4">Target Program</th>
                <th className="p-4">Status</th>
                <th className="p-4">Counsellor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-slate-400">
                    No recent enquiries.
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-brand-900">{enq.enquiryId}</td>
                    <td className="p-4 font-semibold text-slate-900">{enq.studentName}</td>
                    <td className="p-4 text-slate-600">{enq.phone}</td>
                    <td className="p-4 text-slate-700 truncate max-w-[150px]">{enq.preferredCollege?.name || 'N/A'}</td>
                    <td className="p-4 text-slate-700 truncate max-w-[150px]">{enq.preferredCourse?.name || 'N/A'}</td>
                    <td className="p-4">
                      <Badge variant={enq.status === 'New' ? 'accent' : enq.status === 'Admission Completed' ? 'success' : 'primary'}>
                        {enq.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-500">{enq.assignedCounsellor?.name || 'Unassigned'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
