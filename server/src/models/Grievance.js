import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema(
  {
    grievanceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      enum: ['Admission Guidance', 'Documentation', 'Fee Query', 'Counselling Process', 'Staff Behaviour', 'Other'],
      default: 'Admission Guidance',
    },
    description: {
      type: String,
      required: [true, 'Grievance description is required'],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['Open', 'Under Review', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
      default: '',
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Grievance = mongoose.model('Grievance', grievanceSchema);
