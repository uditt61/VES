import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  GraduationCap,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Building,
  BookOpen,
  Calendar,
  Award,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import api from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

const fullEnquirySchema = z.object({
  // Student Info
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  dateOfBirth: z.string().optional().nullable(),
  gender: z.enum(['Male', 'Female', 'Other', '']).optional(),
  phone: z.string().min(10, 'Please enter a valid 10-digit mobile number').max(15),
  alternatePhone: z.string().max(15).optional(),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),

  // Academic Info
  highestQualification: z.string().optional(),
  tenthPassingYear: z.string().optional(),
  twelfthPassingYear: z.string().optional(),
  graduationPassingYear: z.string().optional(),
  percentage: z.string().optional(),
  stream: z.string().optional(),

  // Admission Preferences
  preferredCollege: z.string().min(1, 'Please select a preferred institution'),
  preferredCourse: z.string().min(1, 'Please select a preferred course'),
  preferredLocation: z.string().optional(),
  admissionSession: z.string().default('2026-2027'),
  mode: z.enum(['Regular', 'Online', 'Distance', 'Other']).default('Regular'),

  // Additional
  message: z.string().max(1000).optional(),
  referralSource: z.string().optional(),

  // Consent
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the counselling consent statement',
  }),

  // Honeypot trap
  website_trap: z.string().optional(),
});

export const Enquiry = () => {
  const { showToast } = useToast();
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullEnquirySchema),
    defaultValues: {
      studentName: '',
      gender: '',
      phone: '',
      alternatePhone: '',
      email: '',
      city: '',
      state: 'Madhya Pradesh',
      highestQualification: '12th Standard',
      tenthPassingYear: '',
      twelfthPassingYear: '',
      graduationPassingYear: '',
      percentage: '',
      stream: 'Science (PCB / PCM)',
      preferredCollege: '',
      preferredCourse: '',
      preferredLocation: '',
      admissionSession: '2026-2027',
      mode: 'Regular',
      message: '',
      referralSource: 'Search Engine',
      consent: true,
      website_trap: '',
    },
  });

  const selectedCollege = watch('preferredCollege');

  // Load universities
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const { data } = await api.get('/colleges?limit=50&active=true');
        setColleges(data.data || []);
      } catch (err) {
        console.error('Failed to load institutions', err);
      }
    };
    fetchColleges();
  }, []);

  // Fetch courses when college changes
  useEffect(() => {
    if (!selectedCollege) {
      setCourses([]);
      return;
    }

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const { data } = await api.get(`/courses?college=${selectedCollege}&limit=50&active=true`);
        setCourses(data.data || []);
        if (data.data?.length > 0) {
          setValue('preferredCourse', data.data[0]._id);
        }
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, [selectedCollege, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await api.post('/enquiries', {
        ...data,
        source: 'Main Admission Enquiry Page',
      });

      if (response.data?.success) {
        setSubmittedData(response.data.data);
        showToast('Enquiry registered successfully!', 'success');
        reset();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit enquiry. Please check your details.';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-brand-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-400 bg-brand-900 px-3.5 py-1.5 rounded-full border border-brand-800">
            Admission Session 2026-27
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Online Admission Enquiry Form
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Tell us about your educational background and career goals. Our dedicated counsellor will contact you with university comparisons, seat options, and eligibility guidance.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedData ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center shadow-lg space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-3xl text-slate-900">
                Enquiry Successfully Submitted!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{submittedData.studentName}</strong>. Your enquiry has been received and logged under reference ID:
              </p>
            </div>

            <div className="inline-block bg-brand-50 border-2 border-brand-300 text-brand-950 font-mono font-bold px-6 py-3 rounded-2xl text-xl sm:text-2xl tracking-wider shadow-sm">
              {submittedData.enquiryId}
            </div>

            <div className="max-w-lg mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-2">
              <div className="flex items-center gap-2 text-brand-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>What Happens Next?</span>
              </div>
              <p>1. Our counsellor reviews your academic percentage and preferred degree stream.</p>
              <p>2. You will receive a telephonic guidance call explaining admission steps and document needs.</p>
              <p>3. Zero fees are charged for our preliminary career advice and university discovery.</p>
            </div>

            <button
              onClick={() => setSubmittedData(null)}
              className="px-8 py-3.5 rounded-xl bg-brand-900 text-white font-bold text-sm hover:bg-brand-800 transition-colors shadow-md"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-10"
          >
            {/* Honeypot spam trap */}
            <input
              type="text"
              {...register('website_trap')}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Section 1: Student Information */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2 text-brand-900 font-display font-bold text-lg">
                <User className="w-5 h-5 text-accent-600" />
                <span>1. Personal & Contact Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    {...register('studentName')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {errors.studentName && <p className="text-xs text-rose-500 mt-1">{errors.studentName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    {...register('gender')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Phone (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    {...register('phone')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alternate Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Guardian or alternate mobile"
                    {...register('alternatePhone')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    {...register('email')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bhopal, Indore"
                    {...register('city')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Madhya Pradesh"
                    {...register('state')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Academic Background */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2 text-brand-900 font-display font-bold text-lg">
                <GraduationCap className="w-5 h-5 text-accent-600" />
                <span>2. Academic Background</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highest Qualification
                  </label>
                  <select
                    {...register('highestQualification')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="12th Standard">12th Standard</option>
                    <option value="10th Standard">10th Standard</option>
                    <option value="Diploma">Polytechnic / Diploma</option>
                    <option value="Graduation">Undergraduate Degree</option>
                    <option value="Post-Graduation">Postgraduate Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stream / Subject Focus
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PCB, PCM, Commerce, Arts"
                    {...register('stream')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aggregate % or CGPA
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 78% or Result Awaited"
                    {...register('percentage')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    10th Passing Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2022"
                    {...register('tenthPassingYear')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    12th Passing Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2024 / Appearing"
                    {...register('twelfthPassingYear')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Graduation Passing Year (if PG)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2024"
                    {...register('graduationPassingYear')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Admission Preferences */}
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-2 text-brand-900 font-display font-bold text-lg">
                <Building className="w-5 h-5 text-accent-600" />
                <span>3. Admission Preferences</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred University / College *
                  </label>
                  <select
                    {...register('preferredCollege')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="">-- Choose Institution --</option>
                    {colleges.map((col) => (
                      <option key={col._id} value={col._id}>
                        {col.name} ({col.location?.city || 'MP'})
                      </option>
                    ))}
                  </select>
                  {errors.preferredCollege && (
                    <p className="text-xs text-rose-500 mt-1">{errors.preferredCollege.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Course / Degree *
                  </label>
                  <select
                    {...register('preferredCourse')}
                    disabled={!selectedCollege || loadingCourses}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">
                      {!selectedCollege
                        ? '-- Please choose university first --'
                        : loadingCourses
                        ? 'Loading courses...'
                        : courses.length === 0
                        ? 'No courses listed for this college'
                        : '-- Choose Course --'}
                    </option>
                    {courses.map((cr) => (
                      <option key={cr._id} value={cr._id}>
                        {cr.name} ({cr.degreeType}) &bull; {cr.duration}
                      </option>
                    ))}
                  </select>
                  {errors.preferredCourse && (
                    <p className="text-xs text-rose-500 mt-1">{errors.preferredCourse.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Admission Session
                  </label>
                  <input
                    type="text"
                    value="2026-2027"
                    readOnly
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Study Mode
                  </label>
                  <select
                    {...register('mode')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="Regular">Regular (Full-time campus)</option>
                    <option value="Online">Online / Distance (if applicable)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Campus Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bhopal, Indore, Sagar"
                    {...register('preferredLocation')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Additional Information & Consent */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Questions or Special Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Need hostel accommodation? Have a specific query about eligibility or scholarships? Let us know..."
                  {...register('message')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-1 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to be contacted by Vidhya Advance Education regarding admission counselling, university options, and course updates via phone, SMS, or email.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.consent.message}</p>
                )}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-extrabold text-base shadow-xl hover:shadow-accent-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? (
                  <span>Processing Your Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Admission Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
