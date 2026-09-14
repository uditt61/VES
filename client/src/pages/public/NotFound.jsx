import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Home, BookOpen } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-900 flex items-center justify-center mx-auto border border-brand-200 shadow-sm">
          <GraduationCap className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-display font-extrabold text-brand-900">404</span>
          <h1 className="font-display font-bold text-2xl text-slate-900">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500">
            The educational page, college, or resource you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-900 text-white font-semibold text-xs shadow hover:bg-brand-800 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/colleges"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Colleges</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
