import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variantStyles = {
    primary: 'bg-brand-50 text-brand-800 border-brand-200',
    accent: 'bg-accent-50 text-accent-800 border-accent-200 font-semibold',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
    >
      {children}
    </span>
  );
};
