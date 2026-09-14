import mongoose from 'mongoose';

const websiteContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    lastUpdatedBy: {
      type: String,
      default: 'System',
    },
  },
  {
    timestamps: true,
  }
);

export const WebsiteContent = mongoose.model('WebsiteContent', websiteContentSchema);
