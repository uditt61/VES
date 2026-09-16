import React, { useState, useEffect } from 'react';
import { HeartHandshake, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import api from '../../services/api.js';

export const SocialWork = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await api.get('/social-work?active=true');
        setActivities(data.data || []);
      } catch (err) {
        console.error('Failed to load social work activities', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            Social Welfare Society
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Vidhya Advance Education Social Welfare Society
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Committed to educational equality, free career counselling camps for rural youth, and scholarship awareness for students from underserved communities.
          </p>
        </div>
      </section>

      {/* Society Mission Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
              Community Outreach & Impact
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Education as an Engine for Social Empowerment
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe quality career guidance should never be a privilege reserved only for urban centers. The Vidhya Advance Education Social Welfare Society organizes on-ground awareness workshops across rural and semi-urban districts of Madhya Pradesh.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our team assists higher secondary students in understanding professional degree pathways, demystifying competitive entrance examinations, and applying for government post-matric scholarships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl text-brand-900">1,200+</span>
              <p className="text-xs text-slate-500 font-medium">Students Profiled in Free Camps</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl text-accent-600">15+</span>
              <p className="text-xs text-slate-500 font-medium">Awareness Seminars Conducted</p>
            </div>
            <div className="space-y-1">
              <span className="font-display font-bold text-3xl text-emerald-600">100%</span>
              <p className="text-xs text-slate-500 font-medium">Free Charitable Educational Guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Impact Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Recent Community Initiatives & Camps
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real stories of educational empowerment and student guidance.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-sm text-slate-400">Loading initiatives...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((act) => (
              <div
                key={act._id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 bg-slate-100 overflow-hidden">
                    <img
                      src={act.coverImage || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80'}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brand-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent-400" />
                      <span>{act.location}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(act.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </span>
                      {act.beneficiariesCount > 0 && (
                        <span className="flex items-center gap-1 text-accent-700 font-semibold">
                          <Users className="w-3.5 h-3.5" />
                          <span>{act.beneficiariesCount} Beneficiaries</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-brand-900 transition-colors">
                      {act.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-900 font-semibold bg-brand-50 p-3 rounded-xl border border-brand-100">
                      {act.impactSummary}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {act.description}
                    </p>

                    {act.gallery?.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                          Activity Gallery:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {act.gallery.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt="Activity snapshot"
                              className="w-full h-16 object-cover rounded-lg border border-slate-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
