import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  GraduationCap,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { SEOHead } from '../../components/common/SEOHead.jsx';
import { PAGE_SEO, localBusinessJsonLd, buildBreadcrumbJsonLd } from '../../utils/seoData.js';

export const Contact = () => {
  const { showToast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please fill in your name and phone number', 'error');
      return;
    }
    setFormSubmitted(true);
    showToast('Your message has been received! Our counsellor will call you shortly.', 'success');
  };

  return (
    <div className="space-y-16 pb-16">
      <SEOHead
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        canonicalPath="/contact"
        jsonLd={[
          localBusinessJsonLd,
          buildBreadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Contact Us', url: '/contact' },
          ]),
        ]}
      />
      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            Reach Out
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Contact Vidhya Advance Education Social Welfare Society
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our educational advisors are ready to guide you. Visit our office in Bhopal or reach out via phone, email, or online enquiry.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="font-display font-bold text-2xl text-slate-900">
                Head Office & Helpline
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center shrink-0 border border-brand-200">
                    <MapPin className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Registered Office Address</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Plot No. 12, Commercial Complex, MP Nagar Zone-II, Bhopal, Madhya Pradesh - 462011, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent-800 flex items-center justify-center shrink-0 border border-accent-200">
                    <Phone className="w-5 h-5 text-accent-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Phone Numbers</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Helpline:{' '}
                      <a href="tel:+917554239876" className="text-brand-900 font-semibold hover:underline">
                        +91 755 4239876
                      </a>
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Direct Mobile:{' '}
                      <a href="tel:+919876543210" className="text-brand-900 font-semibold hover:underline">
                        +91 98765 43210
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                    <Mail className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Email Enquiries</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Admissions & Enquiries:{' '}
                      <a href="mailto:abhishek.gupta5058@gmail.com" className="text-brand-900 font-semibold hover:underline">
                        abhishek.gupta5058@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 border border-purple-200">
                    <Clock className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Counselling Desk Hours</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Monday &ndash; Saturday: 9:30 AM &ndash; 6:30 PM
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Sunday: Closed (Online enquiries monitored)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="bg-slate-200 rounded-3xl overflow-hidden h-60 relative border border-slate-300 shadow-inner flex items-center justify-center">
              <div className="text-center p-4 space-y-2">
                <MapPin className="w-8 h-8 text-brand-900 mx-auto" />
                <p className="text-xs font-bold text-slate-700">MP Nagar Zone-II, Bhopal</p>
                <p className="text-[11px] text-slate-500">Central Madhya Pradesh Educational Hub</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest font-bold text-accent-700">
                  Send a Direct Message
                </span>
                <h2 className="font-display font-bold text-2xl text-slate-900">
                  Leave Us an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Fill in your question and an advisor will contact you within 24 hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">Thank You!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your message has been sent to our admissions team. We will call you back shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', message: '' });
                    }}
                    className="mt-2 px-5 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Jain"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message or Course Inquiry
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Let us know what college, course, or admission question you have..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
