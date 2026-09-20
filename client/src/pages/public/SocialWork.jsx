import React, { useState, useEffect } from "react";
import {
  HeartHandshake,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";
import api from "../../services/api.js";
import Workings from "./Workings.jsx";

export const SocialWork = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await api.get("/social-work?active=true");
        setActivities(data.data || []);
      } catch (err) {
        console.error("Failed to load social work activities", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <>
      <div className="pb-16 space-y-16">
        {/* Header Banner */}
        <section className="relative py-16 overflow-hidden text-white bg-brand-950 sm:py-24">
          <div className="relative z-10 px-4 mx-auto space-y-4 text-center max-w-7xl sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
              Social Welfare Society
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white font-display sm:text-5xl">
              Vidhya Advance Education Social Welfare Society
            </h1>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed text-slate-300 sm:text-base">
              Committed to educational equality, free career counselling camps
              for rural youth, and scholarship awareness for students from
              underserved communities.
            </p>
          </div>
        </section>
        {/* Our Recent Works */}
        <Workings />
        {/* Society Mission Statement */}
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="p-8 space-y-6 bg-white border shadow-sm sm:p-12 rounded-3xl border-slate-200">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-brand-600">
                Community Outreach & Impact
              </span>
              <h2 className="text-2xl font-bold font-display sm:text-3xl text-slate-900">
                Education as an Engine for Social Empowerment
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                We believe quality career guidance should never be a privilege
                reserved only for urban centers. The Vidhya Advance Education
                Social Welfare Society organizes on-ground awareness workshops
                across rural and semi-urban districts of Madhya Pradesh.
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                Our team assists higher secondary students in understanding
                professional degree pathways, demystifying competitive entrance
                examinations, and applying for government post-matric
                scholarships.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-4 border-t sm:grid-cols-3 border-slate-100">
              <div className="space-y-1">
                <span className="text-3xl font-bold font-display text-brand-900">
                  1,200+
                </span>
                <p className="text-xs font-medium text-slate-500">
                  Students Profiled in Free Camps
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-bold font-display text-accent-600">
                  15+
                </span>
                <p className="text-xs font-medium text-slate-500">
                  Awareness Seminars Conducted
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-bold font-display text-emerald-600">
                  100%
                </span>
                <p className="text-xs font-medium text-slate-500">
                  Free Charitable Educational Guidance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Activities & Impact Stories */}
        <section className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold font-display sm:text-3xl text-slate-900">
              Recent Community Initiatives & Camps
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Real stories of educational empowerment and student guidance.
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-sm text-center text-slate-400">
              Loading initiatives...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {activities.map((act) => (
                <div
                  key={act._id}
                  className="flex flex-col justify-between overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-3xl border-slate-200 hover:shadow-xl group"
                >
                  <div>
                    <div className="relative overflow-hidden h-60 bg-slate-100">
                      <img
                        src={
                          act.coverImage ||
                          "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80"
                        }
                        alt={act.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-brand-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent-400" />
                        <span>{act.location}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 sm:p-8">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(act.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </span>
                        {act.beneficiariesCount > 0 && (
                          <span className="flex items-center gap-1 font-semibold text-accent-700">
                            <Users className="w-3.5 h-3.5" />
                            <span>{act.beneficiariesCount} Beneficiaries</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold transition-colors font-display text-slate-900 group-hover:text-brand-900">
                        {act.title}
                      </h3>

                      <p className="p-3 text-xs font-semibold border sm:text-sm text-brand-900 bg-brand-50 rounded-xl border-brand-100">
                        {act.impactSummary}
                      </p>

                      <p className="text-xs leading-relaxed whitespace-pre-line text-slate-600">
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
                                className="object-cover w-full h-16 border rounded-lg border-slate-200"
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
      </div>{" "}
    </>
  );
};
