import { z } from 'zod';

export const createCollegeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  type: z.enum(['University', 'College', 'Institute']).default('University'),
  logo: z.string().optional().default(''),
  coverImage: z.string().optional().default(''),
  shortDescription: z.string().max(300).optional().default(''),
  about: z.string().optional().default(''),
  location: z.object({
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    address: z.string().optional().default(''),
    pinCode: z.string().optional().default(''),
  }),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  contactEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  contactPhone: z.string().optional().default(''),
  affiliations: z.array(z.string()).optional().default([]),
  accreditations: z.array(z.string()).optional().default([]),
  approvals: z.array(z.string()).optional().default([]),
  recognitions: z.array(z.string()).optional().default([]),
  whyChooseUs: z.array(z.string()).optional().default([]),
  facilities: z.array(z.string()).optional().default([]),
  gallery: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  metaTitle: z.string().optional().default(''),
  metaDescription: z.string().optional().default(''),
});

export const updateCollegeSchema = createCollegeSchema.partial();
