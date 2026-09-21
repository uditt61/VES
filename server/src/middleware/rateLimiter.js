import rateLimit from 'express-rate-limit';
import { ENV } from '../config/env.js';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: ENV.RATE_LIMIT_MAX || 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this network. Please wait a moment before trying again.',
  },
});

// Strict rate limiter on admin login to stop credential brute-forcing
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // 15 attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. For security, access is temporarily locked for 15 minutes.',
  },
});

// Refresh token rate limiter to protect token rotation endpoint
export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many token refresh requests. Please re-authenticate.',
  },
});

// Strict rate limiter on public lead & enquiry submission to stop spam bots
export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: ENV.ENQUIRY_RATE_LIMIT_MAX || 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many admission submissions received from this network. Please contact our helpline directly.',
  },
});

// Public grievance tracking rate limiter
export const trackingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many grievance tracking lookups. Please try again in a few minutes.',
  },
});
