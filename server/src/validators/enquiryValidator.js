import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createEnquirySchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  dateOfBirth: z.string().optional().nullable(),
  gender: z.enum(['Male', 'Female', 'Other', '']).optional(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
  alternatePhone: z.string().max(15).optional(),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  highestQualification: z.string().max(100).optional(),
  tenthPassingYear: z.string().max(10).optional(),
  twelfthPassingYear: z.string().max(10).optional(),
  graduationPassingYear: z.string().max(10).optional(),
  percentage: z.string().max(20).optional(),
  stream: z.string().max(100).optional(),
  preferredCollege: z.string().regex(objectIdRegex, 'Invalid College ID selected'),
  preferredCourse: z.string().regex(objectIdRegex, 'Invalid Course ID selected'),
  preferredLocation: z.string().max(100).optional(),
  admissionSession: z.string().max(20).optional(),
  mode: z.enum(['Regular', 'Online', 'Distance', 'Other']).optional(),
  message: z.string().max(1000).optional(),
  referralSource: z.string().max(100).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent must be accepted to proceed',
  }),
  // Honeypot anti-spam field: bots fill this hidden field; humans don't
  website_trap: z.string().optional(),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum([
    'New',
    'Contacted',
    'Follow-up',
    'Interested',
    'Application Started',
    'Admission Completed',
    'Not Interested',
    'Closed',
  ]),
  followUpDate: z.string().optional().nullable(),
  assignedCounsellor: z.string().regex(objectIdRegex).optional().nullable(),
  note: z.string().max(1000).optional(),
});

export const addEnquiryNoteSchema = z.object({
  note: z.string().min(1, 'Note cannot be empty').max(1000),
});
