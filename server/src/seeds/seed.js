import { AdminUser } from '../models/AdminUser.js';
import { College } from '../models/College.js';
import { Course } from '../models/Course.js';
import { FAQ } from '../models/FAQ.js';
import { SocialWorkActivity } from '../models/SocialWorkActivity.js';
import { WebsiteContent } from '../models/WebsiteContent.js';
import { Enquiry } from '../models/Enquiry.js';
import { slugify } from '../utils/slugify.js';
import { generateEnquiryId } from '../utils/idGenerator.js';

export const seedInitialData = async () => {
  try {
    // 1. Seed Admin Users
    const existingAdmin = await AdminUser.findOne({ email: 'admin@vidhyaadvance.com' });
    let superAdminId = null;
    let counsellorId = null;

    if (!existingAdmin) {
      console.log('🌱 Seeding Super Admin user...');
      const superAdmin = await AdminUser.create({
        name: 'Vidhya Advance Administrator',
        email: 'admin@vidhyaadvance.com',
        password: 'Admin@12345',
        role: 'SUPER_ADMIN',
        phone: '+91 98765 43210',
        isActive: true,
      });
      superAdminId = superAdmin._id;

      console.log('🌱 Seeding Admission Counsellor user...');
      const counsellor = await AdminUser.create({
        name: 'Senior Admission Counsellor',
        email: 'counsellor@vidhyaadvance.com',
        password: 'Counsellor@12345',
        role: 'COUNSELLOR',
        phone: '+91 98765 43211',
        isActive: true,
      });
      counsellorId = counsellor._id;
    } else {
      superAdminId = existingAdmin._id;
      const counsellor = await AdminUser.findOne({ email: 'counsellor@vidhyaadvance.com' });
      if (counsellor) counsellorId = counsellor._id;
    }

    // 2. Seed Colleges & Universities
    const collegeCount = await College.countDocuments();
    if (collegeCount === 0) {
      console.log('🌱 Seeding Universities & Colleges...');

      const universitiesData = [
        {
          name: 'Dr. Preeti Global University',
          slug: 'dr-preeti-global-university',
          type: 'University',
          logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&auto=format&fit=crop&q=80',
          coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
          shortDescription: 'Established university in Madhya Pradesh offering diverse multidisciplinary programs in technology, management, and healthcare.',
          about: 'Dr. Preeti Global University (DPGU), Shivpuri, Madhya Pradesh, was established to impart quality higher education across central India. The university focuses on practical skills, modern laboratories, dedicated faculties, and career-oriented learning environments.',
          location: {
            city: 'Shivpuri',
            state: 'Madhya Pradesh',
            address: 'Dr. Preeti Global University Campus, NH-27',
            pinCode: '473551',
          },
          website: 'https://dpgu.ac.in',
          contactEmail: 'admissions@dpgu.ac.in',
          contactPhone: '+91 755 4567890',
          affiliations: ['UGC Recognized', 'Madhya Pradesh Private Universities Regulatory Commission'],
          accreditations: [],
          approvals: ['AICTE (Technical Programs)', 'PCI (Pharmacy Courses)', 'INC (Nursing Programs)'],
          recognitions: ['State Private University'],
          whyChooseUs: [
            'Sprawling campus with modern academic infrastructure',
            'Well-equipped laboratories and digital library',
            'Industry mentorship and career placement assistance',
            'Focus on holistic student development and ethics',
          ],
          facilities: ['Hostel Facility', 'Wi-Fi Campus', 'Transportation', 'Sports Complex', 'Modern Labs'],
          isFeatured: true,
          isActive: true,
          metaTitle: 'Dr. Preeti Global University Admissions & Courses | Vidhya Advance Education',
          metaDescription: 'Explore courses, eligibility, and admission guidance for Dr. Preeti Global University Shivpuri through Vidhya Advance Education.',
        },
        {
          name: 'Malwanchal University',
          slug: 'malwanchal-university',
          type: 'University',
          logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&auto=format&fit=crop&q=80',
          coverImage: 'https://malwanchaluniversity.in/management/wp-content/uploads/2025/07/index-medical-college-scaled-1.webp',
          shortDescription: 'Premier university located in Indore known for medical sciences, healthcare, nursing, and professional programs.',
          about: 'Malwanchal University is located in Indore, Madhya Pradesh. The university operates premier healthcare and educational institutes including Index Medical College, Index Dental College, and allied nursing and paramedical institutes with multi-specialty hospital training.',
          location: {
            city: 'Indore',
            state: 'Madhya Pradesh',
            address: 'Index City, NH-59A, Nemawar Road',
            pinCode: '452016',
          },
          website: 'https://malwanchaluniversity.com',
          contactEmail: 'info@malwanchaluniversity.com',
          contactPhone: '+91 731 4013600',
          affiliations: ['UGC Recognized', 'Madhya Pradesh Private Universities Regulatory Commission'],
          accreditations: [],
          approvals: ['NMC / MCI (Medical Programs)', 'DCI (Dental Programs)', 'INC (Nursing)', 'MP Paramedical Council'],
          recognitions: ['State Private University'],
          whyChooseUs: [
            'Associated with high-capacity teaching hospital for extensive clinical exposure',
            'Experienced medical faculty and state-of-the-art diagnostic labs',
            'Robust training in healthcare disciplines and clinical care',
            'Conveniently situated in the commercial hub of Indore',
          ],
          facilities: ['Attached Hospital', 'Advanced Simulation Labs', 'Student Hostels', 'Auditorium', 'Cafeteria'],
          isFeatured: true,
          isActive: true,
          metaTitle: 'Malwanchal University Admissions & Courses | Vidhya Advance Education',
          metaDescription: 'Get admission counselling and fee details for Malwanchal University Indore courses including Nursing, Paramedical, and Management.',
        },
        {
          name: 'Gyanveer University',
          slug: 'gyanveer-university',
          type: 'University',
          logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&auto=format&fit=crop&q=80',
          coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
          shortDescription: 'Dynamic university in Sagar region delivering professional degree programs in sciences, agriculture, and commerce.',
          about: 'Gyanveer University, located in Sagar, Madhya Pradesh, is dedicated to expanding access to modern higher education in the Bundelkhand region. It features contemporary curriculum frameworks, qualified faculties, and value-based education.',
          location: {
            city: 'Sagar',
            state: 'Madhya Pradesh',
            address: 'Gyanveer University Campus, Bhopal Road',
            pinCode: '470001',
          },
          website: 'https://gyanveeruniversity.edu.in',
          contactEmail: 'admission@gyanveeruniversity.edu.in',
          contactPhone: '+91 7582 281234',
          affiliations: ['UGC Recognized', 'Madhya Pradesh Private Universities Regulatory Commission'],
          accreditations: [],
          approvals: ['AICTE (Applied Programs)', 'PCI (Pharmacy)', 'NCTE (Education Programs)'],
          recognitions: ['State Private University'],
          whyChooseUs: [
            'Dedicated regional educational hub with affordable fee structures',
            'Focus on skill development, agriculture, computer science, and commerce',
            'Vibrant student club activities and community outreach initiatives',
            'Dedicated career assistance cell',
          ],
          facilities: ['Digital Classrooms', 'Science Labs', 'Library', 'Hostel', 'Transport'],
          isFeatured: true,
          isActive: true,
          metaTitle: 'Gyanveer University Sagar Courses & Admissions | Vidhya Advance Education',
          metaDescription: 'Find verified course information, eligibility criteria, and admission guidance for Gyanveer University Sagar with Vidhya Advance Education.',
        },
        {
          name: 'Bhabha University',
          slug: 'bhabha-university',
          type: 'University',
          logo: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=200&auto=format&fit=crop&q=80',
          coverImage: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&auto=format&fit=crop&q=80',
          shortDescription: 'Prominent educational university in Bhopal offering wide engineering, dental, pharmacy, and management streams.',
          about: 'Bhabha University, situated in Bhopal, Madhya Pradesh, was established under the Ayushmati Education and Social Society. The campus is spread across a serene environment equipped with extensive laboratories, research facilities, and vocational programs.',
          location: {
            city: 'Bhopal',
            state: 'Madhya Pradesh',
            address: 'Jashoda Garden, Near R.K.D.F. Campus, Hoshangabad Road',
            pinCode: '462026',
          },
          website: 'https://bhabhauniversity.edu.in',
          contactEmail: 'info@bhabhauniversity.edu.in',
          contactPhone: '+91 755 4905100',
          affiliations: ['UGC Recognized', 'Madhya Pradesh Private Universities Regulatory Commission'],
          accreditations: [],
          approvals: ['AICTE', 'PCI', 'DCI', 'INC', 'NCTE'],
          recognitions: ['State Private University'],
          whyChooseUs: [
            'Central location in Bhopal with vast multi-disciplinary programs',
            'Rich legacy in technical and medical science education',
            'Active corporate interaction and internship pathways',
            'Extensive sports, cultural and campus recreation facilities',
          ],
          facilities: ['Dental College & Clinic', 'Engineering Workshops', 'Central Library', 'Cafeteria', 'Hostels'],
          isFeatured: true,
          isActive: true,
          metaTitle: 'Bhabha University Bhopal Admissions & Counselling | Vidhya Advance Education',
          metaDescription: 'Apply for Bhabha University Bhopal courses. Complete guidance on fees, eligibility, and direct admission counselling.',
        },
      ];

      const createdColleges = await College.insertMany(universitiesData);
      console.log(`✅ Seeded ${createdColleges.length} universities.`);

      // 3. Seed Courses for each university
      const collegeMap = {};
      createdColleges.forEach((c) => {
        collegeMap[c.slug] = c._id;
      });

      const coursesData = [
        // Dr. Preeti Global University
        {
          name: 'Bachelor of Technology (Computer Science & Engineering)',
          slug: 'btech-cse-dpgu',
          degreeType: 'B.Tech',
          stream: 'Engineering',
          college: collegeMap['dr-preeti-global-university'],
          duration: '4 Years',
          eligibility: '10+2 with Physics, Mathematics and Chemistry/Computer Science with minimum 45% marks',
          description: 'Comprehensive undergraduate degree focusing on software engineering, algorithms, database systems, AI basics, and web technologies.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Bachelor of Pharmacy (B.Pharm)',
          slug: 'bpharm-dpgu',
          degreeType: 'B.Pharm',
          stream: 'Pharmacy',
          college: collegeMap['dr-preeti-global-university'],
          duration: '4 Years',
          eligibility: '10+2 with Physics, Chemistry and Biology/Mathematics with minimum 50% marks',
          description: 'PCI-approved pharmaceutical sciences degree covering pharmacology, pharmaceutics, and drug discovery.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Master of Business Administration (MBA)',
          slug: 'mba-dpgu',
          degreeType: 'MBA',
          stream: 'Management',
          college: collegeMap['dr-preeti-global-university'],
          duration: '2 Years',
          eligibility: 'Graduation in any discipline with minimum 50% aggregate marks',
          description: 'Postgraduate management program offering specializations in Marketing, Finance, and Human Resource Management.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },

        // Malwanchal University
        {
          name: 'B.Sc. Nursing',
          slug: 'bsc-nursing-malwanchal',
          degreeType: 'B.Sc Nursing',
          stream: 'Nursing',
          college: collegeMap['malwanchal-university'],
          duration: '4 Years',
          eligibility: '10+2 with PCB and English with minimum 45% aggregate marks',
          description: 'INC-approved healthcare program with extensive hands-on clinical rotation at Index Medical College Hospital.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'General Nursing and Midwifery (GNM)',
          slug: 'gnm-malwanchal',
          degreeType: 'Diploma',
          stream: 'Nursing',
          college: collegeMap['malwanchal-university'],
          duration: '3 Years',
          eligibility: '10+2 in any stream with minimum 40% aggregate marks',
          description: 'Practical clinical nursing training designed for community and hospital nursing practice.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Bachelor of Medical Laboratory Technology (BMLT)',
          slug: 'bmlt-malwanchal',
          degreeType: 'BMLT',
          stream: 'Paramedical',
          college: collegeMap['malwanchal-university'],
          duration: '3 Years',
          eligibility: '10+2 with Physics, Chemistry and Biology with minimum 45% aggregate marks',
          description: 'Paramedical program preparing students for diagnostic laboratory techniques, hematology, and pathology analysis.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },

        // Gyanveer University
        {
          name: 'Bachelor of Computer Applications (BCA)',
          slug: 'bca-gyanveer',
          degreeType: 'BCA',
          stream: 'Computer Applications',
          college: collegeMap['gyanveer-university'],
          duration: '3 Years',
          eligibility: '10+2 with Mathematics/Computer Science or equivalent with 45% marks',
          description: 'Undergraduate degree focusing on programming languages, application development, databases, and computer networks.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'B.Sc. Agriculture (Hons.)',
          slug: 'bsc-agriculture-gyanveer',
          degreeType: 'B.Sc (Hons)',
          stream: 'Science',
          college: collegeMap['gyanveer-university'],
          duration: '4 Years',
          eligibility: '10+2 with Agriculture or Science (PCB/PCM) with minimum 50% marks',
          description: 'Four-year agricultural science program covering agronomy, horticulture, soil science, and agro-technology.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Bachelor of Education (B.Ed)',
          slug: 'bed-gyanveer',
          degreeType: 'B.Ed',
          stream: 'Education',
          college: collegeMap['gyanveer-university'],
          duration: '2 Years',
          eligibility: 'Graduation or Post-Graduation with minimum 50% aggregate marks',
          description: 'NCTE-approved teacher training curriculum preparing educators for secondary and higher secondary schooling.',
          admissionStatus: 'Open',
          isFeatured: false,
          isActive: true,
        },

        // Bhabha University
        {
          name: 'Bachelor of Technology (Mechanical Engineering)',
          slug: 'btech-mech-bhabha',
          degreeType: 'B.Tech',
          stream: 'Engineering',
          college: collegeMap['bhabha-university'],
          duration: '4 Years',
          eligibility: '10+2 with PCM with minimum 45% marks',
          description: 'Core engineering curriculum encompassing thermodynamics, machine design, CAD/CAM, and robotics workshops.',
          admissionStatus: 'Open',
          isFeatured: false,
          isActive: true,
        },
        {
          name: 'Diploma in Pharmacy (D.Pharm)',
          slug: 'dpharm-bhabha',
          degreeType: 'D.Pharm',
          stream: 'Pharmacy',
          college: collegeMap['bhabha-university'],
          duration: '2 Years',
          eligibility: '10+2 with PCB/PCM with minimum 45% marks',
          description: 'PCI-approved diploma course enabling students to register as certified pharmacists.',
          admissionStatus: 'Open',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Bachelor of Commerce (B.Com Computer Application)',
          slug: 'bcom-ca-bhabha',
          degreeType: 'B.Com',
          stream: 'Commerce',
          college: collegeMap['bhabha-university'],
          duration: '3 Years',
          eligibility: '10+2 in Commerce or Science with minimum 45% marks',
          description: 'Integrated business commerce and accounting program combined with computerized accounting software training.',
          admissionStatus: 'Open',
          isFeatured: false,
          isActive: true,
        },
      ];

      const createdCourses = await Course.insertMany(coursesData);
      console.log(`✅ Seeded ${createdCourses.length} courses.`);

      // 4. Seed sample Enquiries for demonstration in admin dashboard
      const sampleEnquiries = [
        {
          enquiryId: generateEnquiryId(),
          studentName: 'Rahul Verma',
          phone: '9826012345',
          email: 'rahul.verma@example.com',
          city: 'Bhopal',
          state: 'Madhya Pradesh',
          highestQualification: '12th Standard',
          passingYear: '2025',
          percentage: '82%',
          preferredCollege: createdColleges[0]._id,
          preferredCourse: createdCourses[0]._id,
          status: 'New',
          consent: true,
        },
        {
          enquiryId: generateEnquiryId(),
          studentName: 'Pooja Sharma',
          phone: '9425098765',
          email: 'pooja.sharma@example.com',
          city: 'Indore',
          state: 'Madhya Pradesh',
          highestQualification: '12th Biology',
          passingYear: '2024',
          percentage: '78%',
          preferredCollege: createdColleges[1]._id,
          preferredCourse: createdCourses[3]._id,
          status: 'Contacted',
          assignedCounsellor: counsellorId,
          notes: [
            {
              note: 'Spoke with student. Interested in B.Sc Nursing hostel accommodation details.',
              addedBy: 'Senior Admission Counsellor',
              addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
            },
          ],
          consent: true,
        },
        {
          enquiryId: generateEnquiryId(),
          studentName: 'Amit Patel',
          phone: '9893011223',
          email: 'amit.patel@example.com',
          city: 'Jabalpur',
          state: 'Madhya Pradesh',
          highestQualification: 'Graduation (B.Com)',
          passingYear: '2024',
          percentage: '67%',
          preferredCollege: createdColleges[0]._id,
          preferredCourse: createdCourses[2]._id,
          status: 'Follow-up',
          assignedCounsellor: counsellorId,
          followUpDate: new Date(Date.now() + 1000 * 60 * 60 * 48),
          notes: [
            {
              note: 'Requested MBA fee installment structure. Follow up scheduled.',
              addedBy: 'Senior Admission Counsellor',
              addedAt: new Date(),
            },
          ],
          consent: true,
        },
        {
          enquiryId: generateEnquiryId(),
          studentName: 'Sneha Yadav',
          phone: '9179044556',
          email: 'sneha.yadav@example.com',
          city: 'Gwalior',
          state: 'Madhya Pradesh',
          highestQualification: '12th Science',
          passingYear: '2023',
          percentage: '74%',
          preferredCollege: createdColleges[3]._id,
          preferredCourse: createdCourses[10]._id,
          status: 'Admission Completed',
          assignedCounsellor: superAdminId,
          notes: [
            {
              note: 'Admission confirmed for D.Pharm. Document verification completed.',
              addedBy: 'Vidhya Advance Administrator',
              addedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
            },
          ],
          consent: true,
        },
      ];

      await Enquiry.insertMany(sampleEnquiries);
      console.log(`✅ Seeded sample enquiries.`);
    }

    // 5. Seed FAQs
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      console.log('🌱 Seeding FAQs...');
      const faqsData = [
        {
          question: 'How does Vidhya Advance Education assist students with admissions?',
          answer: 'Vidhya Advance Education provides personalized career counselling, helps students compare approved universities and courses, verifies eligibility criteria, guides document preparation, and assists throughout the admission application process without any hidden charges.',
          category: 'Counselling',
          order: 1,
          isActive: true,
        },
        {
          question: 'Are there any charges for initial admission counselling?',
          answer: 'No, our initial admission counselling, university discovery, and guidance sessions for students and parents are completely free of charge. We are committed to ethical educational counselling.',
          category: 'Admission',
          order: 2,
          isActive: true,
        },
        {
          question: 'How do you verify whether a university is approved or accredited?',
          answer: 'We assist students in verifying institutions against authoritative statutory portals including the University Grants Commission (UGC), All India Council for Technical Education (AICTE), Pharmacy Council of India (PCI), Indian Nursing Council (INC), and respective state regulatory bodies.',
          category: 'Eligibility',
          order: 3,
          isActive: true,
        },
        {
          question: 'What documents are required to initiate an admission enquiry?',
          answer: 'Basic documents include 10th and 12th marksheets, graduation marksheets (for PG courses), transfer/migration certificate, government photo ID proof (Aadhaar card), passport-size photographs, and category certificate (if applicable).',
          category: 'Documentation',
          order: 4,
          isActive: true,
        },
        {
          question: 'Can I apply if my 12th or graduation result is currently awaited?',
          answer: 'Yes! You can register your admission enquiry under the "Result Awaited" status to secure provisional counselling and early seat reservation in selected universities.',
          category: 'Admission',
          order: 5,
          isActive: true,
        },
        {
          question: 'How do I raise a grievance or register a concern?',
          answer: 'You can submit a grievance directly through our online Grievance Redressal portal at /grievance. You will receive an instant Grievance Tracking ID, and our compliance officer will review and respond within 48 business hours.',
          category: 'General',
          order: 6,
          isActive: true,
        },
      ];
      await FAQ.insertMany(faqsData);
      console.log(`✅ Seeded ${faqsData.length} FAQs.`);
    }

    // 6. Seed Social Work Activities
    const socialCount = await SocialWorkActivity.countDocuments();
    if (socialCount === 0) {
      console.log('🌱 Seeding Social Welfare initiatives...');
      const socialData = [
        {
          title: 'Free Rural Career & Education Awareness Camp',
          slug: 'free-rural-career-education-awareness-camp',
          date: new Date('2025-11-15'),
          location: 'Sehore District, Madhya Pradesh',
          impactSummary: 'Over 450 rural higher secondary students received free career profiling, guidance on government scholarships, and professional course discovery.',
          description: 'Organized by Vidhya Advance Education Social Welfare Society, this multi-day awareness camp brought senior career counsellors to rural government schools. Students received free aptitude guidance, scholarship application forms, and one-on-one sessions addressing career pathways after 12th grade.',
          coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
          gallery: [
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80',
          ],
          beneficiariesCount: 450,
          isActive: true,
        },
        {
          title: 'Women in STEM & Healthcare Scholarship Workshop',
          slug: 'women-in-stem-healthcare-scholarship-workshop',
          date: new Date('2026-01-20'),
          location: 'Bhopal, Madhya Pradesh',
          impactSummary: 'Guiding 280 female aspirants toward nursing, pharmacy, and computer science degrees with state and central scholarship support.',
          description: 'A dedicated initiative to empower young women from economically weaker sections to pursue degree programs in STEM and healthcare disciplines. Our team guided families through state post-matric scholarships and institutional fee concession processes.',
          coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
          gallery: [
            'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&auto=format&fit=crop&q=80',
          ],
          beneficiariesCount: 280,
          isActive: true,
        },
      ];
      await SocialWorkActivity.insertMany(socialData);
      console.log(`✅ Seeded ${socialData.length} Social Welfare initiatives.`);
    }

    // 7. Seed Website Dynamic Content
    const contentCount = await WebsiteContent.countDocuments();
    if (contentCount === 0) {
      console.log('🌱 Seeding Website Content...');
      const siteContents = [
        {
          key: 'hero_content',
          value: {
            badge: 'Certified Educational Consultancy & Admission Guidance',
            title: 'Shape Your Future With the Right Education & Verified Guidance',
            subtitle: 'Explore recognized universities, discover industry-aligned degree courses, and receive honest, personalized admission counselling from Vidhya Advance Education.',
            primaryCtaText: 'Start Your Admission Enquiry',
            secondaryCtaText: 'Explore Colleges & Universities',
          },
          description: 'Homepage Hero Banner texts',
        },
        {
          key: 'trust_stats',
          value: {
            institutionsGuided: '40+',
            studentsAdvised: '5,000+',
            successRatio: '100%',
            yearsOfTrust: '8+',
          },
          description: 'Trust counters on public pages',
        },
        {
          key: 'contact_info',
          value: {
            organization: 'Vidhya Advance Education',
            address: 'Plot No. 12, Commercial Complex, MP Nagar Zone-II, Bhopal, Madhya Pradesh - 462011',
            primaryPhone: '+91 755 4239876',
            helplinePhone: '+91 98765 43210',
            email: 'contact@vidhyaadvance.com',
            admissionsEmail: 'admissions@vidhyaadvance.com',
            workingHours: 'Monday - Saturday: 9:30 AM to 6:30 PM',
          },
          description: 'Official organization contact details',
        },
        {
          key: 'notice_banner',
          value: {
            isActive: true,
            message: '🎓 Admissions Open for Academic Session 2026-2027. Early counselling slots available for Nursing, Engineering & Management programs!',
            linkText: 'Apply Now',
            linkUrl: '/enquiry',
          },
          description: 'Top announcement ticker',
        },
      ];
      await WebsiteContent.insertMany(siteContents);
      console.log(`✅ Seeded Website Content.`);
    }

    console.log('🎉 Database seeding completed successfully.');
  } catch (error) {
    console.error('❌ Database Seeding Error:', error);
  }
};
