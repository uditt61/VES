import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    degreeType: {
      type: String,
      required: [true, 'Degree / Program type is required'],
      trim: true,
      index: true,
    },
    stream: {
      type: String,
      required: [true, 'Stream is required'],
      trim: true,
      index: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: [true, 'Associated College is required'],
      index: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility criteria is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    admissionStatus: {
      type: String,
      enum: ['Open', 'Upcoming', 'Closed'],
      default: 'Open',
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.index({ name: 'text', degreeType: 'text', stream: 'text' });

export const Course = mongoose.model('Course', courseSchema);
