# Vidhya Advance Education - API Documentation

Backend REST API documentation for the **Vidhya Advance Education** Career Consultancy & Admission Lead Generation Platform.

Base URL: `http://localhost:5000/api` (or configured `PORT`)

---

## 1. Authentication & Session (`/api/auth`)

### 1.1 Login
- **Endpoint**: `POST /api/auth/login`
- **Auth Required**: No (Rate limited to 15 attempts / 15 min)
- **Request Body**:
  ```json
  {
    "email": "admin@vidhyaadvance.com",
    "password": "Admin@12345"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Logged in successfully",
    "data": {
      "accessToken": "eyJhbGciOi...",
      "user": {
        "id": "60d0fe4f5311236168a109ca",
        "name": "Vidhya Advance Administrator",
        "email": "admin@vidhyaadvance.com",
        "role": "SUPER_ADMIN"
      }
    }
  }
  ```
- **Cookies Set**: `refreshToken` (HTTP-only, SameSite: Lax, Secure in production, 7 days expiry).

### 1.2 Refresh Access Token
- **Endpoint**: `POST /api/auth/refresh`
- **Auth Required**: No (Requires valid `refreshToken` cookie)
- **Response** (`200 OK`): Issues new short-lived access token and rotates the refresh token cookie.

### 1.3 Logout
- **Endpoint**: `POST /api/auth/logout`
- **Auth Required**: No
- **Response** (`200 OK`): Clears `refreshToken` cookie and marks token as revoked in the database.

### 1.4 Get Profile
- **Endpoint**: `GET /api/auth/me`
- **Auth Required**: Yes (`Bearer <accessToken>`)
- **Response** (`200 OK`): Returns current admin profile.

---

## 2. Colleges & Universities (`/api/colleges`)

### 2.1 Get All Colleges
- **Endpoint**: `GET /api/colleges`
- **Auth Required**: No for public active listings. (Authenticated admins can filter `active=false`).
- **Query Parameters**:
  - `search`: Case-insensitive text search (name, city, state, affiliations)
  - `type`: `University` | `College` | `Institute`
  - `city`, `state`: Geographic filters
  - `featured`: `true` | `false`
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 12)
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Colleges retrieved successfully",
    "data": [
      {
        "_id": "...",
        "name": "Dr. Preeti Global University",
        "slug": "dr-preeti-global-university",
        "type": "University",
        "location": { "city": "Shivpuri", "state": "Madhya Pradesh" },
        "affiliations": ["UGC Recognized"],
        "approvals": ["AICTE", "PCI", "INC"],
        "isFeatured": true,
        "isActive": true
      }
    ],
    "meta": { "total": 4, "page": 1, "limit": 12, "totalPages": 1 }
  }
  ```

### 2.2 Get College by Slug
- **Endpoint**: `GET /api/colleges/slug/:slug`
- **Auth Required**: No
- **Response** (`200 OK`): Returns full institution profile populated with active `courses`.

### 2.3 Create College
- **Endpoint**: `POST /api/colleges`
- **Auth Required**: Yes (`SUPER_ADMIN` or `ADMIN`)
- **Audit Logged**: Yes

### 2.4 Update College
- **Endpoint**: `PATCH /api/colleges/:id`
- **Auth Required**: Yes (`SUPER_ADMIN` or `ADMIN`)
- **Audit Logged**: Yes

### 2.5 Delete / Deactivate College
- **Endpoint**: `DELETE /api/colleges/:id?permanent=false`
- **Auth Required**: Yes (`SUPER_ADMIN` or `ADMIN`)
- **Note**: Soft delete by default (`isActive: false`). Pass `permanent=true` for complete database removal.

---

## 3. Courses (`/api/courses`)

### 3.1 Get All Courses
- **Endpoint**: `GET /api/courses`
- **Auth Required**: No
- **Query Parameters**: `search`, `college` (ID), `degreeType`, `stream`, `admissionStatus`, `featured`, `page`, `limit`

### 3.2 Create Course
- **Endpoint**: `POST /api/courses`
- **Auth Required**: Yes (`SUPER_ADMIN` or `ADMIN`)

### 3.3 Update Course
- **Endpoint**: `PATCH /api/courses/:id`
- **Auth Required**: Yes (`SUPER_ADMIN` or `ADMIN`)

### 3.4 Delete Course
- **Endpoint**: `DELETE /api/courses/:id`
- **Auth Required**: Yes (`SUPER_ADMIN` or `ADMIN`)

---

## 4. Admission Enquiries & Leads (`/api/enquiries`)

### 4.1 Submit Enquiry (Public Lead Generation)
- **Endpoint**: `POST /api/enquiries`
- **Auth Required**: No (Rate limited to prevent flood attacks)
- **Anti-Spam**: Honeypot field `website_trap` + 24h duplicate submission prevention.
- **Request Body**:
  ```json
  {
    "studentName": "Rahul Sharma",
    "phone": "9826012345",
    "email": "rahul@example.com",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "highestQualification": "12th Standard",
    "passingYear": "2025",
    "percentage": "82%",
    "stream": "PCM",
    "preferredCollege": "66dfb3...",
    "preferredCourse": "66dfb4...",
    "consent": true
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Thank you for your enquiry. Our admission counsellor will contact you shortly.",
    "data": {
      "enquiryId": "VAE-2026-A9F3C1",
      "studentName": "Rahul Sharma",
      "createdAt": "2026-09-10T08:00:00.000Z"
    }
  }
  ```

### 4.2 Get All Enquiries
- **Endpoint**: `GET /api/enquiries`
- **Auth Required**: Yes (`SUPER_ADMIN`, `ADMIN`, `COUNSELLOR`)
- **Query Parameters**: `search`, `status`, `college`, `course`, `counsellor`, `startDate`, `endDate`, `page`, `limit`

### 4.3 Export Enquiries to CSV
- **Endpoint**: `GET /api/enquiries/export/csv`
- **Auth Required**: Yes (`SUPER_ADMIN` or `ADMIN`)
- **Response**: `Content-Type: text/csv` file attachment.

### 4.4 Update Lead Status
- **Endpoint**: `PATCH /api/enquiries/:id`
- **Auth Required**: Yes (`SUPER_ADMIN`, `ADMIN`, `COUNSELLOR`)
- **Request Body**:
  ```json
  {
    "status": "Contacted",
    "assignedCounsellor": "66df...",
    "followUpDate": "2026-09-15T10:00:00.000Z",
    "note": "Student interested in hostel facilities."
  }
  ```

### 4.5 Add Note to Lead
- **Endpoint**: `POST /api/enquiries/:id/notes`
- **Auth Required**: Yes (`SUPER_ADMIN`, `ADMIN`, `COUNSELLOR`)

---

## 5. Grievances (`/api/grievances`)

- `POST /api/grievances` - Public grievance submission (returns tracking ID e.g. `GRV-2026-XXXXXX`)
- `GET /api/grievances/track?grievanceId=...&phone=...` - Public grievance status checker
- `GET /api/grievances` - Admin grievance queue (`SUPER_ADMIN`, `ADMIN`)
- `PATCH /api/grievances/:id` - Admin status & resolution notes update

---

## 6. FAQs & Social Work

- `GET /api/faqs` - Public active FAQs
- `POST /api/faqs`, `PATCH /api/faqs/:id`, `DELETE /api/faqs/:id` - Admin FAQ management
- `GET /api/social-work` - Public society initiatives & awareness camps
- `POST /api/social-work`, `PATCH /api/social-work/:id`, `DELETE /api/social-work/:id` - Admin CRUD

---

## 7. Website CMS Content (`/api/content`)

- `GET /api/content` - Key-value map of dynamic site headlines, notice banners, and contact information
- `PUT /api/content/:key` - Update content by key (`SUPER_ADMIN`, `ADMIN`, `CONTENT_MANAGER`)

---

## 8. Admin Users & Security Audit

- `GET /api/admin/users` - List staff users (`SUPER_ADMIN`, `ADMIN`)
- `POST /api/admin/users` - Create user (`SUPER_ADMIN`)
- `PATCH /api/admin/users/:id` - Update user / role (`SUPER_ADMIN`)
- `DELETE /api/admin/users/:id` - Delete user (`SUPER_ADMIN`)
- `GET /api/admin/audit-logs` - View security audit logs with timestamps, actions, and IP (`SUPER_ADMIN`)
- `GET /api/admin/dashboard/stats` - Live database KPIs, pipeline distribution, and monthly trend graphs
- `GET /api/sitemap.xml` - Dynamic XML sitemap for search engine indexing
