# Vidhya Advance Education - Career Consultancy & Admission Platform

> A production-ready, full-stack career consultancy & admission lead generation platform for **Vidhya Advance Education**. Built with React, Vite, Tailwind CSS, Express.js, MongoDB, Mongoose, and JWT authentication with rotated HTTP-only refresh tokens.

---

## 📌 Project Highlights

- **Lead Generation Pipeline**: High-converting admission inquiry capture with unique tracking IDs (`VAE-2026-XXXXXX`), honeypot spam traps, and 24h duplicate prevention.
- **Institutional Directory**: Dynamic discovery for affiliated colleges and universities (**Dr. Preeti Global University**, **Malwanchal University**, **Gyanveer University**, **Bhabha University**) with verified statutory approvals (UGC, AICTE, INC, PCI).
- **Searchable Course Catalog**: Filter degree programs across Engineering, Nursing, Pharmacy, Management, and Paramedical sciences.
- **SaaS-Grade Admin Console**:
  - Live Dashboard KPIs & Monthly Lead Trend Visualizations.
  - Lead Management with Status Pipeline, Counsellor Assignments, Follow-up Scheduler, and CSV Export.
  - CRUD for Colleges, Courses, FAQs, and Social Welfare initiatives.
  - Role-Based Access Control (`SUPER_ADMIN`, `ADMIN`, `COUNSELLOR`, `CONTENT_MANAGER`).
  - Tamper-Evident Admin Security Audit Logs.
- **Student Redressal**: Public grievance submission and status tracking (`GRV-2026-XXXXXX`).
- **SEO & Performance**: Dynamic XML sitemap generator (`/api/sitemap.xml`), clean slug routing, OpenGraph social meta tags, and lazy loading.

---

## 🛠️ Technology Stack

### Frontend (`client/`)
- **Core**: React 18, Vite, React Router v6
- **Styling**: Tailwind CSS with custom Indian education consultancy design system
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod
- **Networking**: Axios with automatic token refresh queue interceptors

### Backend (`server/`)
- **Core**: Node.js, Express.js
- **Database**: MongoDB with Mongoose (with automatic in-memory fallback for zero-dependency local development and testing)
- **Authentication**: JWT Access Token (15m) + Rotated Refresh Token (7d) in HTTP-only cookies, bcryptjs password hashing
- **Security**: Helmet, Express Rate Limiter, Input Sanitization, Audit Logger
- **Validation**: Zod schema middleware

---

## 📁 Repository Structure

```text
d:\VES\
├── server/
│   ├── src/
│   │   ├── config/          # db.js, env.js
│   │   ├── controllers/     # auth, colleges, courses, enquiries, grievances, faqs, socialWork, content, adminUsers, dashboard, auditLogs
│   │   ├── middleware/      # auth, rbac, errorHandler, rateLimiter, validate, auditLogger
│   │   ├── models/          # AdminUser, RefreshToken, College, Course, Enquiry, Grievance, FAQ, SocialWorkActivity, WebsiteContent, AuditLog
│   │   ├── routes/          # Express route definitions
│   │   ├── seeds/           # Initial database seeder
│   │   ├── utils/           # apiResponse, apiError, slugify, idGenerator
│   │   ├── validators/      # Zod validation schemas
│   │   ├── app.js           # Express application setup
│   │   └── server.js        # Server entrypoint
│   ├── tests/               # Integration tests (Jest & Supertest)
│   ├── .env.example
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, NoticeBanner, LeadModal, Badge, SkeletonLoader, ConfirmModal
│   │   ├── context/         # AuthContext, ToastContext
│   │   ├── layouts/         # PublicLayout, AdminLayout
│   │   ├── pages/
│   │   │   ├── public/      # Home, About, Colleges, CollegeDetail, Courses, SocialWork, FAQ, Grievance, Contact, Enquiry, PrivacyPolicy, TermsConditions, NotFound
│   │   │   └── admin/       # AdminLogin, Dashboard, EnquiryManager, CollegeManager, CourseManager, GrievanceManager, FAQManager, SocialWorkManager, ContentManager, AdminUserManager, AuditLogViewer
│   │   ├── services/        # Axios API client
│   │   ├── App.jsx          # Route mapping
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── API.md                   # Full REST API documentation
└── README.md
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js >= 18
- npm >= 9
- (Optional) MongoDB Atlas or local MongoDB URI (backend automatically provisions an in-memory database fallback if empty!)

### 1. Server Setup
```bash
cd server
cp .env.example .env

# Install dependencies
npm install

# (Optional) Run tests to verify all 16 integration test suites pass
npm test

# Seed database with sample universities, courses, FAQs, and admin accounts
npm run seed

# Start server in development mode (runs on http://localhost:5000)
npm run dev
```

### 2. Client Setup
```bash
cd ../client

# Install dependencies
npm install

# Start Vite dev server (runs on http://localhost:5173 with proxy to backend)
npm run dev
```

---

## 🔑 Default Administrator Credentials

Seeded automatically by `npm run seed`:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@vidhyaadvance.com` | `Admin@12345` | Full system access, audit logs, staff management |
| **Counsellor** | `counsellor@vidhyaadvance.com` | `Counsellor@12345` | Manage assigned student leads, follow-ups, and notes |

---

## 🧪 Running Automated Tests

The test suite covers public health endpoints, university and course listings, sitemap generation, enquiry validation, duplicate detection, honeypot anti-spam, grievance tracking, JWT authentication, and refresh token rotation:

```bash
cd server
npm test
```

---

## 🔒 Security Best Practices Implemented

- **No Plaintext Passwords**: Hashed with salted bcrypt (12 rounds).
- **HTTP-Only Cookies**: Refresh tokens are stored exclusively in HTTP-only, SameSite cookies to protect against XSS token theft.
- **Refresh Token Rotation**: Old tokens are revoked immediately when rotated. Token reuse triggers instant revocation of all active sessions for that user.
- **Rate Limiting**: Protects login and public enquiry endpoints from brute-force and spam bots.
- **Audit Logging**: All admin mutations (creates, updates, deletes) are permanently recorded in `AuditLog` with user ID, IP address, and timestamp.
- **Input Validation**: Double-sided validation (Zod schemas on both frontend and backend).

---

## 📄 License & Intellectual Property

&copy; {new Date().getFullYear()} Vidhya Advance Education. All rights reserved.
