import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import api from '../../services/api.js';

export const NoticeBanner = () => {
  const [notice, setNotice] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const { data } = await api.get('/content');
        if (data.data?.notice_banner && data.data.notice_banner.isActive) {
          setNotice(data.data.notice_banner);
        }
      } catch (err) {
        // Silent fallback
      }
    };
    fetchNotice();
  }, []);

  if (dismissed || !notice) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950 text-white text-xs sm:text-sm py-2 px-4 relative border-b border-brand-700/50 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-4 h-4 text-accent-400 shrink-0 animate-pulse" />
          <span className="font-medium">{notice.message}</span>
          {notice.linkText && (
            <Link
              to={notice.linkUrl || '/enquiry'}
              className="inline-flex items-center gap-1 font-semibold text-accent-400 hover:text-accent-300 underline underline-offset-2 ml-1"
            >
              {notice.linkText}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white transition-colors ml-2"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
