import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
  Loader2,
  ChevronDown,
} from "lucide-react";
import api from "../../services/api.js";
import { useToast } from "../../context/ToastContext.jsx";

const quickEnquirySchema = z.object({
  studentName: z
    .string()
    .min(2, "Name is required")
    .max(100)
    .regex(/^[a-zA-Z\s.'-]+$/, "Only letters allowed"),
  phone: z
    .string()
    .min(10, "Valid 10-digit phone is required")
    .max(15, "Max 15 digits allowed")
    .regex(/^[0-9]+$/, "Only digits allowed"),
  email: z
    .string()
    .email("Valid email is required")
    .optional()
    .or(z.literal("")),
  preferredCollege: z.string().min(1, "Please select an institution"),
  preferredCourse: z.string().min(1, "Please select a program"),
  message: z.string().max(500).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Please consent to be contacted",
  }),
  website_trap: z.string().optional(),
});

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Reusable input wrapper
const inputBase =
  "w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all bg-white";
const inputNormal =
  "border-slate-200 focus:ring-brand-500 focus:border-brand-400";
const inputError =
  "border-rose-300 focus:ring-rose-400 focus:border-rose-400 bg-rose-50/40";

export const LeadModal = ({
  isOpen,
  onClose,
  initialCollegeId = "",
  initialCourseId = "",
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
    mode: "onTouched",
    defaultValues: {
      studentName: "",
      phone: "",
      email: "",
      preferredCollege: initialCollegeId || "",
      preferredCourse: initialCourseId || "",
      message: "",
      consent: true,
      website_trap: "",
    },
  });

  const selectedCollegeId = watch("preferredCollege");

  // Load universities
  useEffect(() => {
    if (!isOpen) return;
    const fetchColleges = async () => {
      try {
        const { data } = await api.get("/colleges?limit=50&active=true");
        setColleges(data.data || []);
      } catch (err) {
        console.error("Failed to load colleges", err);
      }
    };
    fetchColleges();
  }, [isOpen]);

  // Set initial college
  useEffect(() => {
    if (initialCollegeId) setValue("preferredCollege", initialCollegeId);
  }, [initialCollegeId, setValue]);

  // Fetch courses
  useEffect(() => {
    if (!selectedCollegeId) {
      setCourses([]);
      return;
    }
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const { data } = await api.get(
          `/courses?college=${selectedCollegeId}&limit=50&active=true`,
        );
        setCourses(data.data || []);
        if (
          initialCourseId &&
          data.data.some((c) => c._id === initialCourseId)
        ) {
          setValue("preferredCourse", initialCourseId);
        } else if (data.data.length > 0) {
          setValue("preferredCourse", data.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, [selectedCollegeId, initialCourseId, setValue]);

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const response = await api.post("/enquiries", {
        ...formData,
        source: "Quick Modal Form",
      });
      if (response.data?.success) {
        setSubmittedLead(response.data.data);
        showToast("Enquiry submitted successfully!", "success");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to submit enquiry. Please try again.";
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    reset();
    setSubmittedLead(null);
    onClose();
  };

  // Phone input filter - allow only digits
  const handlePhoneInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 15);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={handleModalClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleModalClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait">
              {submittedLead ? (
                // Success State
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-6 space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900">
                    Enquiry Submitted! 🎉
                  </h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you,{" "}
                    <span className="font-semibold text-slate-900">
                      {submittedLead.studentName}
                    </span>
                    . Your enquiry has been registered with reference ID:
                  </p>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block bg-brand-50 border border-brand-200 text-brand-900 font-mono font-bold px-4 py-2 rounded-xl text-lg tracking-wider"
                  >
                    {submittedLead.enquiryId}
                  </motion.div>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Our educational counsellor will call you shortly to assist
                    with fees, eligibility, and scholarship details.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleModalClose}
                    className="mt-4 w-full py-3 rounded-xl bg-brand-900 text-white font-semibold text-sm hover:bg-brand-800 transition-colors shadow-md"
                  >
                    Done
                  </motion.button>
                </motion.div>
              ) : (
                // Form State
                <motion.div
                  key="form"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-200 text-accent-800 text-xs font-semibold mb-2">
                      <GraduationCap className="w-3.5 h-3.5 text-accent-600" />
                      <span>Free Admission Guidance</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">
                      Quick Admission Enquiry
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Tell us your preference and our senior counsellor will
                      connect with you.
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot */}
                    <input
                      type="text"
                      {...register("website_trap")}
                      className="hidden"
                      tabIndex="-1"
                      autoComplete="off"
                    />

                    {/* Student Name */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          {...register("studentName")}
                          className={`${inputBase} ${
                            errors.studentName ? inputError : inputNormal
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.studentName && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-rose-500 mt-1 font-medium"
                          >
                            {errors.studentName.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Phone and Email */}
                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="tel"
                            inputMode="numeric"
                            placeholder="10-digit mobile"
                            maxLength={15}
                            {...register("phone", {
                              onChange: handlePhoneInput,
                            })}
                            onKeyDown={(e) => {
                              if (
                                !/[0-9]/.test(e.key) &&
                                ![
                                  "Backspace",
                                  "Delete",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Tab",
                                  "Home",
                                  "End",
                                ].includes(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                            className={`${inputBase} ${
                              errors.phone ? inputError : inputNormal
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-rose-500 mt-1 font-medium"
                            >
                              {errors.phone.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
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
                            {...register("email")}
                            className={`${inputBase} ${
                              errors.email ? inputError : inputNormal
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-rose-500 mt-1 font-medium"
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* University Select */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred University / College *
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                        <select
                          {...register("preferredCollege")}
                          className={`${inputBase} pr-10 appearance-none cursor-pointer ${
                            errors.preferredCollege ? inputError : inputNormal
                          } ${!selectedCollegeId ? "text-slate-400" : "text-slate-900"}`}
                        >
                          <option value="">-- Choose Institution --</option>
                          {colleges.map((c) => (
                            <option
                              key={c._id}
                              value={c._id}
                              className="text-slate-900"
                            >
                              {c.name} ({c.location?.city || "MP"})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                      <AnimatePresence>
                        {errors.preferredCollege && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-rose-500 mt-1 font-medium"
                          >
                            {errors.preferredCollege.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Course Select */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Course / Program *
                      </label>
                      <div className="relative">
                        <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                        <select
                          {...register("preferredCourse")}
                          disabled={!selectedCollegeId || loadingCourses}
                          className={`${inputBase} pr-10 appearance-none cursor-pointer ${
                            errors.preferredCourse ? inputError : inputNormal
                          } disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed`}
                        >
                          <option value="">
                            {!selectedCollegeId
                              ? "-- Please choose university first --"
                              : loadingCourses
                                ? "Loading courses..."
                                : courses.length === 0
                                  ? "No courses found for this college"
                                  : "-- Choose Course --"}
                          </option>
                          {courses.map((c) => (
                            <option
                              key={c._id}
                              value={c._id}
                              className="text-slate-900"
                            >
                              {c.name} ({c.degreeType}) - {c.duration}
                            </option>
                          ))}
                        </select>
                        {loadingCourses ? (
                          <Loader2 className="w-4 h-4 text-brand-500 absolute right-3.5 top-3.5 animate-spin pointer-events-none" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                        )}
                      </div>
                      <AnimatePresence>
                        {errors.preferredCourse && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-rose-500 mt-1 font-medium"
                          >
                            {errors.preferredCourse.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Consent */}
                    <motion.div variants={itemVariants} className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register("consent")}
                          className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
                          I agree to be contacted by Vidhya Advance Education
                          Social Welfare Society regarding admission guidance
                          and course information.
                        </span>
                      </label>
                      <AnimatePresence>
                        {errors.consent && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-rose-500 mt-1 font-medium"
                          >
                            {errors.consent.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={itemVariants}>
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{
                          scale: submitting ? 1 : 1.02,
                          y: submitting ? 0 : -2,
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Enquiry</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
