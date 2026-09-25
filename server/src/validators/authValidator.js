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
  email: z.string().email('Please provide a valid email address').optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'COUNSELLOR', 'CONTENT_MANAGER']).optional(),
  phone: z.string().optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
  email: z.string().email('Please provide a valid email address').optional(),
  phone: z.string().optional(),
});


export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});

export const adminResetPasswordSchema = z.object({
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});

