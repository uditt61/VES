/**
 * seoData.js — Centralized SEO constants, JSON-LD generators, and helpers
 * for Vidhya Advance Education Social Welfare Society.
 */

// ─── Core Constants ───────────────────────────────────────────────
export const SITE_NAME = 'Vidhya Advance Education Social Welfare Society';
export const SITE_SHORT_NAME = 'Vidhya Advance';
export const BASE_URL = 'https://vidhyaadvance.com';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/banners1.jpeg`;
export const CONTACT_PHONE = '+917554239876';
export const CONTACT_PHONE_DISPLAY = '+91 755 4239876';
export const CONTACT_EMAIL = 'admissions@vidhyaadvance.com';
export const CONTACT_EMAIL_GENERAL = 'contact@vidhyaadvance.com';
export const ADDRESS = {
  streetAddress: 'Plot No. 12, Commercial Complex, MP Nagar Zone-II',
  addressLocality: 'Bhopal',
  addressRegion: 'Madhya Pradesh',
  postalCode: '462011',
  addressCountry: 'IN',
};

// ─── Title Builder ─────────────────────────────────────────────────
export const buildPageTitle = (pageTitle) => {
  if (!pageTitle) return SITE_NAME;
  return `${pageTitle} | ${SITE_SHORT_NAME}`;
};

// ─── JSON-LD: Organization (reused on every page) ──────────────────
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: [SITE_SHORT_NAME, 'VES', 'Vidhya Advance Education'],
  url: BASE_URL,
  logo: `${BASE_URL}/banners1.jpeg`,
  description:
    'Vidhya Advance Education Social Welfare Society is a registered educational guidance and social welfare organization in Bhopal, Madhya Pradesh, India. We provide transparent admission counselling and career guidance for universities across central India.',
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    ...ADDRESS,
  },
  areaServed: [
    { '@type': 'State', name: 'Madhya Pradesh' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: [],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: CONTACT_PHONE,
      contactType: 'admissions',
      areaServed: 'IN',
      availableLanguage: ['Hindi', 'English'],
    },
    {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL_GENERAL,
      contactType: 'customer service',
    },
  ],
};

// ─── JSON-LD: WebSite with SearchAction ────────────────────────────
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: SITE_NAME,
  url: BASE_URL,
  publisher: { '@id': `${BASE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/courses?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ─── JSON-LD: BreadcrumbList Generator ─────────────────────────────
/**
 * buildBreadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Colleges', url: '/colleges' }])
 */
export const buildBreadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
  })),
});

// ─── JSON-LD: FAQPage Generator ────────────────────────────────────
/**
 * buildFaqJsonLd([{ question: '...', answer: '...' }])
 */
export const buildFaqJsonLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// ─── JSON-LD: LocalBusiness (for Contact page) ─────────────────────
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: `${BASE_URL}/banners1.jpeg`,
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  url: BASE_URL,
  address: {
    '@type': 'PostalAddress',
    ...ADDRESS,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.2332,
    longitude: 77.4344,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: 'Free Counselling',
};

// ─── JSON-LD: CollegeOrUniversity Generator ────────────────────────
/**
 * buildCollegeJsonLd({ name, slug, city, state, type, website })
 */
export const buildCollegeJsonLd = (college) => ({
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  name: college.name,
  url: college.website || `${BASE_URL}/colleges/${college.slug}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: college.city || 'Bhopal',
    addressRegion: college.state || 'Madhya Pradesh',
    addressCountry: 'IN',
  },
});

// ─── Default page-level SEO configs ────────────────────────────────
export const PAGE_SEO = {
  home: {
    title: 'Admission Guidance & Career Counselling in Bhopal MP',
    description:
      'Vidhya Advance Education Social Welfare Society offers free admission counselling for B.Tech, B.Sc Nursing, MBA, D.Pharm, B.Pharm, Paramedical & more at top universities in Madhya Pradesh. Session 2026-27 open.',
    keywords:
      'admission guidance Bhopal, career counselling MP, college admission Madhya Pradesh, university admission 2026, B.Tech admission, nursing admission MP, MBA counselling, Vidhya Advance Education',
  },
  about: {
    title: 'About Us — Educational Guidance & Social Welfare',
    description:
      'Learn about Vidhya Advance Education Social Welfare Society — a registered organization in Bhopal, MP dedicated to transparent educational guidance, admission counselling, and social welfare for students.',
    keywords:
      'about Vidhya Advance, educational society Bhopal, social welfare society MP, admission guidance organization, educational counselling India',
  },
  colleges: {
    title: 'Partner Universities & Colleges — Admission Guidance MP',
    description:
      'Explore accredited partner universities including Dr. Preeti Global University, Malwanchal University, Gyanveer University, Bhabha University and more. Get direct admission guidance in Madhya Pradesh.',
    keywords:
      'Dr. Preeti Global University admission, Malwanchal University, Gyanveer University counselling, Bhabha University direct admission, college admission guidance MP, Central India university admission',
  },
  courses: {
    title: 'Courses & Programs — B.Tech, Nursing, MBA Admission 2026',
    description:
      'Browse available courses: B.Tech, B.Sc Nursing, D.Pharm, B.Pharm, MBA, BBA, Paramedical, Engineering and more. Get admission guidance for session 2026-27 in Madhya Pradesh universities.',
    keywords:
      'B.Sc Nursing admission 2026 MP, B.Tech admission counselling Bhopal, D.Pharm B.Pharm admission, MBA admission guidance MP, paramedical courses direct admission, engineering college Bhopal',
  },
  contact: {
    title: 'Contact Us — Admission Helpline Bhopal MP',
    description:
      'Contact Vidhya Advance Education Social Welfare Society in Bhopal. Call our admission helpline, email us, or visit our office at MP Nagar Zone-II for free educational counselling.',
    keywords:
      'contact Vidhya Advance, admission helpline Bhopal, educational counsellor contact, MP Nagar office, college admission enquiry phone',
  },
  faq: {
    title: 'FAQs — College Admission Questions Answered',
    description:
      'Frequently asked questions about college admissions, university counselling, course eligibility, fee structure, and application process. Get answers from Vidhya Advance Education Society.',
    keywords:
      'admission FAQ, college counselling questions, university admission process, course eligibility questions, admission guidance FAQ',
  },
  enquiry: {
    title: 'Submit Enquiry — Free Admission Counselling',
    description:
      'Submit your admission enquiry for free counselling. Our expert advisors will guide you to the right university and course for your career goals in Madhya Pradesh and across India.',
    keywords:
      'admission enquiry, free counselling form, college admission help, career guidance enquiry, university application help',
  },
  socialWork: {
    title: 'Social Welfare Activities — Community Service Initiatives',
    description:
      'Discover the social welfare activities and community service initiatives by Vidhya Advance Education Social Welfare Society — making education accessible and giving back to society.',
    keywords:
      'social welfare activities, community service education, educational welfare Bhopal, student welfare initiatives, social work society MP',
  },
  grievance: {
    title: 'Grievance Portal — Submit Complaints & Feedback',
    description:
      'File a grievance or provide feedback about our services. Vidhya Advance Education Social Welfare Society is committed to transparency and addressing every concern promptly.',
    keywords:
      'grievance portal, complaint submission, feedback form, educational grievance, admission complaint',
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    description:
      'Read the privacy policy of Vidhya Advance Education Social Welfare Society. Learn how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, personal information policy',
  },
  termsConditions: {
    title: 'Terms & Conditions',
    description:
      'Terms and conditions governing the use of Vidhya Advance Education Social Welfare Society website and services.',
    keywords: 'terms and conditions, terms of service, usage policy',
  },
};
