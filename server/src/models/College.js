import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'College/University name is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['University', 'College', 'Institute'],
      default: 'University',
      index: true,
    },
    logo: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '',
    },
    about: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      city: { type: String, required: true, trim: true, index: true },
      state: { type: String, required: true, trim: true, index: true },
      address: { type: String, trim: true, default: '' },
      pinCode: { type: String, trim: true, default: '' },
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    contactPhone: {
      type: String,
      trim: true,
      default: '',
    },
    affiliations: {
      type: [String],
      default: [],
    },
    accreditations: {
      type: [String],
      default: [],
    },
    approvals: {
      type: [String],
      default: [],
    },
    recognitions: {
      type: [String],
      default: [],
    },
    whyChooseUs: {
      type: [String],
      default: [],
    },
    facilities: {
      type: [String],
      default: [],
    },
    gallery: {
      type: [String],
      default: [],
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
    metaTitle: {
      type: String,
      trim: true,
      default: '',
    },
    metaDescription: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const College = mongoose.model('College', collegeSchema);
