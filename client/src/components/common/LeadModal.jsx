import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  GraduationCap,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Building,
  BookOpen,
} from 'lucide-react';
import api from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

const quickEnquirySchema = z.object({
  studentName: z.string().min(2, 'Name is required').max(100),
  phone: z.string().min(10, 'Valid 10-digit phone is required').max(15),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  preferredCollege: z.string().min(1, 'Please select an institution'),
  preferredCourse: z.string().min(1, 'Please select a program'),
  message: z.string().max(500).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Please consent to be contacted',
  }),
  website_trap: z.string().optional(),
});

export const LeadModal = ({
  isOpen,
  onClose,
  initialCollegeId = '',
  initialCourseId = '',
}) => {
  const { showToast } = useToast();
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quickEnquirySchema),
    defaultValues: {
      studentName: '',
      phone: '',
      email: '',
      preferredCollege: initialCollegeId || '',
      preferredCourse: initialCourseId || '',
      message: '',
      consent: true,
      website_trap: '',
    },
  });

  const selectedCollegeId = watch('preferredCollege');

  // Load universities
  useEffect(() => {
    if (!isOpen) return;

    const fetchColleges = async () => {
      try {
        const { data } = await api.get('/colleges?limit=50&active=true');
        setColleges(data.data || []);
      } catch (err) {
        console.error('Failed to load colleges', err);
      }
    };
    fetchColleges();
  }, [isOpen]);

  // Set initial college and course when props change
  useEffect(() => {
    if (initialCollegeId) {
      setValue('preferredCollege', initialCollegeId);
    }
  }, [initialCollegeId, setValue]);

  // Fetch courses whenever selected college changes
  useEffect(() => {
    if (!selectedCollegeId) {
      setCourses([]);
      return;
    }

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const { data } = await api.get(`/courses?college=${selectedCollegeId}&limit=50&active=true`);
        setCourses(data.data || []);
        if (initialCourseId && data.data.some((c) => c._id === initialCourseId)) {
          setValue('preferredCourse', initialCourseId);
        } else if (data.data.length > 0) {
          setValue('preferredCourse', data.data[0]._id);
        }
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, [selectedCollegeId, initialCourseId, setValue]);

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const response = await api.post('/enquiries', {
        ...formData,
        source: 'Quick Modal Form',
      });

      if (response.data?.success) {
        setSubmittedLead(response.data.data);
        showToast('Enquiry submitted successfully!', 'success');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit enquiry. Please try again.';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    reset();
    setSubmittedLead(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedLead ? (
          // Success State
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Enquiry Submitted!
            </h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{submittedLead.studentName}</span>. Your enquiry has been registered with reference ID:
            </p>
            <div className="inline-block bg-brand-50 border border-brand-200 text-brand-900 font-mono font-bold px-4 py-2 rounded-xl text-lg tracking-wider">
              {submittedLead.enquiryId}
            </div>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Our educational counsellor will call you shortly to assist with fees, eligibility, and scholarship details.
            </p>
            <button
              onClick={handleModalClose}
              className="mt-4 w-full py-3 rounded-xl bg-brand-900 text-white font-semibold text-sm hover:bg-brand-800 transition-colors shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          // Form State
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-200 text-accent-800 text-xs font-semibold mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-accent-600" />
                <span>Free Admission Guidance</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">
                Quick Admission Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us your preference and our senior counsellor will connect with you.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Anti-spam honeypot (hidden) */}
              <input
                type="text"
                {...register('website_trap')}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    {...register('studentName')}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                </div>
                {errors.studentName && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.studentName.message}</p>
                )}
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      placeholder="10-digit mobile"
                      {...register('phone')}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="student@example.com"
                      {...register('email')}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* University Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred University / College *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <select
                    {...register('preferredCollege')}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">-- Choose Institution --</option>
                    {colleges.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.location?.city || 'MP'})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.preferredCollege && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.preferredCollege.message}</p>
                )}
              </div>

              {/* Course Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Course / Program *
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <select
                    {...register('preferredCourse')}
                    disabled={!selectedCollegeId || loadingCourses}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">
                      {!selectedCollegeId
                        ? '-- Please choose university first --'
                        : loadingCourses
                        ? 'Loading courses...'
                        : courses.length === 0
                        ? 'No courses found for this college'
                        : '-- Choose Course --'}
                    </option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.degreeType}) - {c.duration}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.preferredCourse && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.preferredCourse.message}</p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to be contacted by Vidhya Advance Education regarding admission counselling and course information.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.consent.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
