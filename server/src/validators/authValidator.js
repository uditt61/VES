import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const createAdminUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'COUNSELLOR', 'CONTENT_MANAGER']),
  phone: z.string().optional(),
});

export const updateAdminUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'COUNSELLOR', 'CONTENT_MANAGER']).optional(),
  phone: z.string().optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).optional(),
});
