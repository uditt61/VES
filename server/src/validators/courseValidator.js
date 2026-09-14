import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createCourseSchema = z.object({
  name: z.string().min(2, 'Course name must be at least 2 characters'),
  degreeType: z.string().min(2, 'Degree type is required (e.g. B.Tech, MBA, MBBS)'),
  stream: z.string().min(2, 'Stream is required (e.g. Engineering, Management, Nursing)'),
  college: z.string().regex(objectIdRegex, 'Invalid associated College ID'),
  duration: z.string().min(1, 'Duration is required (e.g. 4 Years)'),
  eligibility: z.string().min(1, 'Eligibility criteria is required'),
  description: z.string().optional().default(''),
  admissionStatus: z.enum(['Open', 'Upcoming', 'Closed']).default('Open'),
  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
});

export const updateCourseSchema = createCourseSchema.partial();
