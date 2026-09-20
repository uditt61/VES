import { Enquiry } from '../models/Enquiry.js';
import { generateEnquiryId } from '../utils/idGenerator.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export class EnquiryController {
  // Public Submission
  static async createEnquiry(req, res, next) {
    try {
      const data = req.body;

      // 1. Honeypot check: If bot filled the trap, return fake success
      if (data.website_trap && data.website_trap.trim() !== '') {
        return ApiResponse.created(
          res,
          { enquiryId: generateEnquiryId(), studentName: data.studentName },
          'Thank you for your enquiry. Our admission counsellor will contact you shortly.'
        );
      }
      delete data.website_trap;

      // 2. Duplicate submission prevention (within 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const existing = await Enquiry.findOne({
        phone: data.phone,
        preferredCourse: data.preferredCourse,
        createdAt: { $gte: oneDayAgo },
      });

      if (existing) {
        return ApiResponse.success(
          res,
          {
            enquiryId: existing.enquiryId,
            studentName: existing.studentName,
            isExisting: true,
          },
          'Thank you! We already have an active enquiry with these details. Our counsellor will reach out to you shortly.'
        );
      }

      // 3. Generate unique enquiry ID
      const enquiryId = generateEnquiryId();

      const newEnquiry = await Enquiry.create({
        ...data,
        enquiryId,
        status: 'New',
      });

      // 4. Return safe payload (no internal secrets)
      return ApiResponse.created(
        res,
        {
          enquiryId: newEnquiry.enquiryId,
          studentName: newEnquiry.studentName,
          createdAt: newEnquiry.createdAt,
        },
        'Thank you for your enquiry. Our admission counsellor will contact you shortly.'
      );
    } catch (error) {
      next(error);
    }
  }

  // Admin: Get all leads with advanced filters and pagination
  static async getAllEnquiries(req, res, next) {
    try {
      const {
        search,
        status,
        college,
        course,
        counsellor,
        startDate,
        endDate,
        page = 1,
        limit = 15,
        sort = 'createdAt',
        order = 'desc',
      } = req.query;

      const filter = {};

      // If user is a COUNSELLOR, only show enquiries assigned to them unless permitted
      if (req.user.role === 'COUNSELLOR') {
        filter.assignedCounsellor = req.user.id;
      } else if (counsellor) {
        filter.assignedCounsellor = counsellor;
      }

      if (status) {
        filter.status = status;
      }

      if (college) {
        filter.preferredCollege = college;
      }

      if (course) {
        filter.preferredCourse = course;
      }

      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
      }

      if (search) {
        filter.$or = [
          { enquiryId: new RegExp(search, 'i') },
          { studentName: new RegExp(search, 'i') },
          { phone: new RegExp(search, 'i') },
          { email: new RegExp(search, 'i') },
          { city: new RegExp(search, 'i') },
        ];
      }

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
      const skip = (pageNum - 1) * limitNum;

      const sortOrder = order === 'asc' ? 1 : -1;
      const sortObj = { [sort]: sortOrder };

      const [enquiries, total] = await Promise.all([
        Enquiry.find(filter)
          .populate('preferredCollege', 'name slug logo')
          .populate('preferredCourse', 'name degreeType stream')
          .populate('assignedCounsellor', 'name email role')
          .sort(sortObj)
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Enquiry.countDocuments(filter),
      ]);

      return ApiResponse.success(
        res,
        enquiries,
        'Enquiries retrieved successfully',
        200,
        {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        }
      );
    } catch (error) {
      next(error);
    }
  }

  // Admin: Get single lead details
  static async getEnquiryById(req, res, next) {
    try {
      const enquiry = await Enquiry.findById(req.params.id)
        .populate('preferredCollege', 'name slug logo location website')
        .populate('preferredCourse', 'name degreeType stream duration')
        .populate('assignedCounsellor', 'name email phone role');

      if (!enquiry) {
        throw ApiError.notFound('Enquiry not found');
      }

      // Counsellor check
      if (
        req.user.role === 'COUNSELLOR' &&
        enquiry.assignedCounsellor?._id?.toString() !== req.user.id
      ) {
        throw ApiError.forbidden('You are not authorized to view this lead');
      }

      return ApiResponse.success(res, enquiry, 'Enquiry details retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Admin: Update lead status, counsellor, or follow-up date
  static async updateEnquiry(req, res, next) {
    try {
      const { status, followUpDate, assignedCounsellor, note } = req.body;
      const enquiry = await Enquiry.findById(req.params.id);

      if (!enquiry) {
        throw ApiError.notFound('Enquiry not found');
      }

      if (status) enquiry.status = status;
      if (followUpDate !== undefined) enquiry.followUpDate = followUpDate ? new Date(followUpDate) : null;
      if (assignedCounsellor !== undefined) enquiry.assignedCounsellor = assignedCounsellor || null;

      if (note && note.trim()) {
        enquiry.notes.push({
          note: note.trim(),
          addedBy: req.user.name,
          addedAt: new Date(),
        });
      }

      await enquiry.save();

      const populated = await Enquiry.findById(enquiry._id)
        .populate('preferredCollege', 'name slug')
        .populate('preferredCourse', 'name degreeType')
        .populate('assignedCounsellor', 'name email');

      return ApiResponse.success(res, populated, 'Enquiry updated successfully');
    } catch (error) {
      next(error);
    }
  }

  // Admin: Add note to lead
  static async addNote(req, res, next) {
    try {
      const { note } = req.body;
      const enquiry = await Enquiry.findById(req.params.id);

      if (!enquiry) {
        throw ApiError.notFound('Enquiry not found');
      }

      enquiry.notes.push({
        note,
        addedBy: req.user.name,
        addedAt: new Date(),
      });

      await enquiry.save();

      return ApiResponse.success(res, enquiry.notes, 'Note added successfully');
    } catch (error) {
      next(error);
    }
  }

  // Admin: Export Leads to CSV
  static async exportCSV(req, res, next) {
    try {
      const enquiries = await Enquiry.find()
        .populate('preferredCollege', 'name')
        .populate('preferredCourse', 'name degreeType')
        .populate('assignedCounsellor', 'name')
        .sort({ createdAt: -1 })
        .limit(2000)
        .lean();

      // Construct CSV
      const headers = [
        'Enquiry ID',
        'Date',
        'Student Name',
        'Phone',
        'Email',
        'City',
        'State',
        'Highest Qualification',
        'Passing Year',
        'Percentage',
        'College',
        'Course',
        'Status',
        'Assigned Counsellor',
        'Notes Count',
      ];

      const rows = enquiries.map((e) => [
        `"${e.enquiryId || ''}"`,
        `"${new Date(e.createdAt).toLocaleDateString()}"`,
        `"${(e.studentName || '').replace(/"/g, '""')}"`,
        `"${e.phone || ''}"`,
        `"${e.email || ''}"`,
        `"${(e.city || '').replace(/"/g, '""')}"`,
        `"${(e.state || '').replace(/"/g, '""')}"`,
        `"${(e.highestQualification || '').replace(/"/g, '""')}"`,
        `"${e.passingYear || ''}"`,
        `"${e.percentage || ''}"`,
        `"${(e.preferredCollege?.name || '').replace(/"/g, '""')}"`,
        `"${(e.preferredCourse?.name || '').replace(/"/g, '""')}"`,
        `"${e.status || ''}"`,
        `"${(e.assignedCounsellor?.name || 'Unassigned').replace(/"/g, '""')}"`,
        `"${e.notes?.length || 0}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="vidhya_advance_leads_${Date.now()}.csv"`
      );
      return res.status(200).send(csvContent);
    } catch (error) {
      next(error);
    }
  }
}
