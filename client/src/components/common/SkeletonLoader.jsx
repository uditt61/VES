import React from 'react';

export const CardSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between h-72"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-200" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-slate-200 rounded" />
              <div className="h-3 bg-slate-200 rounded w-5/6" />
            </div>
          </div>
          <div className="flex gap-2 pt-4 border-t border-slate-100">
            <div className="h-9 bg-slate-200 rounded-lg flex-1" />
            <div className="h-9 bg-slate-200 rounded-lg flex-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="w-full space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-slate-200 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};
