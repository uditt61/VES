import rateLimit from 'express-rate-limit';
import { ENV } from '../config/env.js';

export const apiLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max: ENV.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // 15 login attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. For security, please try again in 15 minutes.',
  },
});

export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: ENV.ENQUIRY_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many admission enquiries submitted from this network. Please wait a while or contact our office directly.',
  },
});
