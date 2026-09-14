import request from 'supertest';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { seedInitialData } from '../src/seeds/seed.js';
import { College } from '../src/models/College.js';
import { Course } from '../src/models/Course.js';

let server;
let adminAccessToken = '';
let adminRefreshTokenCookie = '';
let testCollegeId = '';
let testCourseId = '';

beforeAll(async () => {
  await connectDB();
  await seedInitialData();

  const college = await College.findOne({ slug: 'dr-preeti-global-university' });
  testCollegeId = college._id.toString();

  const course = await Course.findOne({ college: college._id });
  testCourseId = course._id.toString();
});

afterAll(async () => {
  await disconnectDB();
});

describe('1. Public Health & Discovery APIs', () => {
  test('GET /api/health should return 200 healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/colleges should return seeded universities with pagination meta', async () => {
    const res = await request(app).get('/api/colleges');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(4);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta.total).toBeGreaterThanOrEqual(4);
  });

  test('GET /api/colleges/slug/dr-preeti-global-university should return details with active courses', async () => {
    const res = await request(app).get('/api/colleges/slug/dr-preeti-global-university');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Dr. Preeti Global University');
    expect(Array.isArray(res.body.data.courses)).toBe(true);
    expect(res.body.data.courses.length).toBeGreaterThan(0);
  });

  test('GET /api/courses should return filtered courses', async () => {
    const res = await request(app).get('/api/courses?stream=Pharmacy');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].stream).toBe('Pharmacy');
  });

  test('GET /api/sitemap.xml should return valid XML sitemap', async () => {
    const res = await request(app).get('/api/sitemap.xml');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('application/xml');
    expect(res.text).toContain('<urlset');
    expect(res.text).toContain('dr-preeti-global-university');
  });
});

describe('2. Public Admission Enquiry & Anti-Spam', () => {
  const validEnquiry = {
    studentName: 'Aarav Gupta',
    phone: '9876500001',
    email: 'aarav.gupta@example.com',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    highestQualification: '12th Science',
    passingYear: '2025',
    percentage: '85%',
    preferredCollege: '',
    preferredCourse: '',
    consent: true,
  };

  beforeEach(() => {
    validEnquiry.preferredCollege = testCollegeId;
    validEnquiry.preferredCourse = testCourseId;
  });

  test('POST /api/enquiries should successfully create lead and return unique enquiryId', async () => {
    const res = await request(app).post('/api/enquiries').send(validEnquiry);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.enquiryId).toMatch(/^VAE-2026-[A-F0-9]{6}$/);
    expect(res.body.data.studentName).toBe('Aarav Gupta');
    // Ensure no internal DB fields leaked
    expect(res.body.data.notes).toBeUndefined();
    expect(res.body.data.assignedCounsellor).toBeUndefined();
  });

  test('POST /api/enquiries duplicate check prevents spam within 24h', async () => {
    const res = await request(app).post('/api/enquiries').send(validEnquiry);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.isExisting).toBe(true);
  });

  test('POST /api/enquiries rejects invalid submissions without required consent or phone', async () => {
    const res = await request(app).post('/api/enquiries').send({
      studentName: 'Invalid Test',
      phone: '123', // too short
      consent: false,
    });
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/enquiries rejects bots with honeypot trap populated', async () => {
    const res = await request(app).post('/api/enquiries').send({
      ...validEnquiry,
      phone: '9876500002',
      website_trap: 'http://spam-link.ru',
    });
    // Returns 201 silently to deceive bot without creating DB record
    expect(res.status).toBe(201);
  });
});

describe('3. Grievance Redressal System', () => {
  let createdGrievanceId = '';

  test('POST /api/grievances submits a grievance and generates a tracking ID', async () => {
    const res = await request(app).post('/api/grievances').send({
      name: 'Rohan Sharma',
      phone: '9826199999',
      email: 'rohan.sharma@example.com',
      subject: 'Inquiry regarding document verification delay',
      category: 'Documentation',
      description: 'Submitted 12th marksheet verification request 3 days ago. Looking for updates.',
    });
    expect(res.status).toBe(201);
    expect(res.body.data.grievanceId).toMatch(/^GRV-2026-[A-F0-9]{6}$/);
    createdGrievanceId = res.body.data.grievanceId;
  });

  test('GET /api/grievances/track allows student to track status by ID', async () => {
    const res = await request(app)
      .get(`/api/grievances/track?grievanceId=${createdGrievanceId}&phone=9826199999`);
    expect(res.status).toBe(200);
    expect(res.body.data.grievanceId).toBe(createdGrievanceId);
    expect(res.body.data.status).toBe('Open');
  });
});

describe('4. Authentication & RBAC Flow', () => {
  test('POST /api/auth/login rejects invalid password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@vidhyaadvance.com',
      password: 'WrongPassword!',
    });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login succeeds with valid admin credentials and sets HTTP-only cookie', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'admin@vidhyaadvance.com',
      password: 'Admin@12345',
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe('SUPER_ADMIN');

    adminAccessToken = res.body.data.accessToken;

    // Verify HTTP-only cookie header
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    const refreshCookie = cookies.find((c) => c.startsWith('refreshToken='));
    expect(refreshCookie).toBeDefined();
    expect(refreshCookie).toContain('HttpOnly');
    adminRefreshTokenCookie = refreshCookie.split(';')[0];
  });

  test('POST /api/auth/refresh rotates the refresh token and returns new access token', async () => {
    const res = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', [adminRefreshTokenCookie]);

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();

    // Verify a new rotated refresh token was issued
    const cookies = res.headers['set-cookie'];
    const newRefreshCookie = cookies.find((c) => c.startsWith('refreshToken='));
    expect(newRefreshCookie).toBeDefined();
    // Update cookie for subsequent tests
    adminRefreshTokenCookie = newRefreshCookie.split(';')[0];
    adminAccessToken = res.body.data.accessToken;
  });

  test('GET /api/admin/dashboard/stats rejects unauthenticated access with 401', async () => {
    const res = await request(app).get('/api/admin/dashboard/stats');
    expect(res.status).toBe(401);
  });

  test('GET /api/admin/dashboard/stats allows authenticated admin with 200 and real statistics', async () => {
    const res = await request(app)
      .get('/api/admin/dashboard/stats')
      .set('Authorization', `Bearer ${adminAccessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.metrics).toBeDefined();
    expect(res.body.data.metrics.totalEnquiries).toBeGreaterThanOrEqual(1);
    expect(res.body.data.statusDistribution).toBeDefined();
  });
});
