import { z } from 'zod';

export const createGrievanceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  category: z.enum([
    'Admission Guidance',
    'Documentation',
    'Fee Query',
    'Counselling Process',
    'Staff Behaviour',
    'Other',
  ]),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  website_trap: z.string().optional(),
});

export const updateGrievanceSchema = z.object({
  status: z.enum(['Open', 'Under Review', 'In Progress', 'Resolved', 'Closed']),
  internalNotes: z.string().optional(),
});

export const createFaqSchema = z.object({
  question: z.string().min(5, 'Question must be at least 5 characters').max(300),
  answer: z.string().min(5, 'Answer must be at least 5 characters'),
  category: z.enum(['Admission', 'Counselling', 'Eligibility', 'Documentation', 'Fees & Scholarships', 'General']),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const updateFaqSchema = createFaqSchema.partial();
