import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
      trim: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const enquirySchema = new mongoose.Schema(
  {
    enquiryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: 100,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true,
    },
    alternatePhone: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    state: {
      type: String,
      trim: true,
      default: '',
    },
    highestQualification: {
      type: String,
      trim: true,
      default: '',
    },
    tenthPassingYear: {
      type: String,
      trim: true,
      default: '',
    },
    twelfthPassingYear: {
      type: String,
      trim: true,
      default: '',
    },
    graduationPassingYear: {
      type: String,
      trim: true,
      default: '',
    },
    passingYear: {
      type: String,
      trim: true,
      default: '',
    },
    percentage: {
      type: String,
      trim: true,
      default: '',
    },
    stream: {
      type: String,
      trim: true,
      default: '',
    },
    preferredCollege: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: [true, 'Preferred College / University is required'],
      index: true,
    },
    preferredCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Preferred Course is required'],
      index: true,
    },
    preferredLocation: {
      type: String,
      trim: true,
      default: '',
    },
    admissionSession: {
      type: String,
      trim: true,
      default: '2026-2027',
    },
    mode: {
      type: String,
      enum: ['Regular', 'Online', 'Distance', 'Other'],
      default: 'Regular',
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    source: {
      type: String,
      trim: true,
      default: 'Direct Website',
    },
    referralSource: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'New',
        'Contacted',
        'Follow-up',
        'Interested',
        'Application Started',
        'Admission Completed',
        'Not Interested',
        'Closed',
      ],
      default: 'New',
      index: true,
    },
    assignedCounsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      default: null,
      index: true,
    },
    notes: [noteSchema],
    followUpDate: {
      type: Date,
      default: null,
      index: true,
    },
    consent: {
      type: Boolean,
      required: [true, 'Consent is required to submit enquiry'],
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ createdAt: -1 });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
