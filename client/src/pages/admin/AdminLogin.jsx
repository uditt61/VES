import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  GraduationCap,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  KeyRound,
  PhoneCall,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError('');
    try {
      await login(data.email, data.password);
      showToast('Welcome back! Signed in successfully.', 'success');
      const destination = location.state?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Invalid email or password. Please check your credentials.';

      if (msg.toLowerCase().includes('status code 401') || msg.toLowerCase().includes('unauthorized')) {
        setLoginError('Invalid email or password. Please check your credentials.');
      } else if (msg.toLowerCase().includes('status code 429') || msg.toLowerCase().includes('too many requests')) {
        setLoginError('Too many login attempts. Please wait 15 minutes and try again.');
      } else {
        setLoginError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-brand-800 text-accent-400 flex items-center justify-center border border-brand-700 shadow-xl group-hover:scale-105 transition-transform">
            <GraduationCap className="w-7 h-7" />
          </div>
        </Link>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
          Vidhya Advance Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Sign in with your staff credentials to manage admission leads and institution records.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-800/90 border border-slate-700/80 backdrop-blur-md py-8 px-6 sm:px-10 rounded-3xl shadow-2xl space-y-6">
          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="admin@vidhyaadvance.com"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-400 mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setHelpModalOpen(true)}
                  className="text-[11px] text-accent-400 hover:text-accent-300 transition-colors"
                >
                  Forgot or need credentials?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-400 mt-1 font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            &larr; Back to Public Website
          </Link>
        </div>
      </div>

      {/* Credential Recovery Assistance Modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-left space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/30 text-accent-400 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Staff Credential Recovery</h3>
                  <p className="text-xs text-slate-400">Password reset & credential issuance</p>
                </div>
              </div>
              <button
                onClick={() => setHelpModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>
                For security and regulatory compliance, staff and counsellor accounts are provisioned and reset exclusively by authorized administrators.
              </p>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <span className="font-semibold text-white block text-[13px]">How to recover access:</span>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                  <li>
                    Contact the Super Administrator at <strong className="text-accent-300 font-mono">admin@vidhyaadvance.com</strong>.
                  </li>
                  <li>
                    Or call the administrative helpline directly at <strong className="text-white">+91 9821776333</strong>.
                  </li>
                  <li>
                    An administrator will reset your password or issue new credentials via the <strong className="text-white">Staff & User Management</strong> console.
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-brand-950/60 border border-brand-800/60 text-slate-300 flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-accent-400 shrink-0" />
                <span>Office Hours: Mon - Sat (9:30 AM to 6:30 PM)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setHelpModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-xs transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
