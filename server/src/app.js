import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';

import { ENV } from './config/env.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ApiError } from './utils/apiError.js';

import authRoutes from './routes/authRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import socialWorkRoutes from './routes/socialWorkRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import auditLogRoutes from './routes/auditLogRoutes.js';

import { College } from './models/College.js';
import { Course } from './models/Course.js';

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Compression
app.use(compression());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
      if (ENV.NODE_ENV === 'development') {
        return callback(null, true);
      }
      const allowedOrigins = ENV.CLIENT_URL.split(',').map((u) => u.trim());
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        origin.endsWith('.vercel.app') ||
        origin.includes('vidhyaadvanceeducation.com') ||
        allowedOrigins.some((allowed) => allowed !== '*' && origin.endsWith(allowed.replace(/^https?:\/\//, '')))
      ) {
        return callback(null, true);
      }
      callback(new Error(`CORS origin '${origin}' not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body and Cookie Parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// Request logging in non-production
if (ENV.NODE_ENV !== 'test') {
  app.use(morgan(ENV.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Global API rate limiter
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Vidhya Advance Education Backend',
    version: '1.0.0',
  });
});

// Dynamic sitemap.xml endpoint for SEO
app.get('/api/sitemap.xml', async (req, res, next) => {
  try {
    const clientUrl = ENV.CLIENT_URL || 'https://vidhyaadvance.com';
    const staticUrls = [
      '',
      '/about',
      '/colleges',
      '/courses',
      '/social-work',
      '/faq',
      '/grievance',
      '/contact',
      '/enquiry',
      '/privacy-policy',
      '/terms-and-conditions',
    ];

    const colleges = await College.find({ isActive: true }).select('slug updatedAt').lean();
    const courses = await Course.find({ isActive: true }).select('_id updatedAt').lean();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticUrls.forEach((path) => {
      xml += `  <url>\n    <loc>${clientUrl}${path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${path === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    colleges.forEach((col) => {
      const lastMod = col.updatedAt ? new Date(col.updatedAt).toISOString().split('T')[0] : '2026-01-01';
      xml += `  <url>\n    <loc>${clientUrl}/colleges/${col.slug}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/social-work', socialWorkRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/audit-logs', auditLogRoutes);

// Catch 404 for unknown API endpoints
app.use('*', (req, res, next) => {
  next(ApiError.notFound(`Cannot find ${req.method} ${req.originalUrl} on this server`));
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
