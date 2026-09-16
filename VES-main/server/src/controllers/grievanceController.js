import { Grievance } from '../models/Grievance.js';
import { generateGrievanceId } from '../utils/idGenerator.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export class GrievanceController {
  // Public Submission
  static async submitGrievance(req, res, next) {
    try {
      const data = req.body;

      if (data.website_trap && data.website_trap.trim() !== '') {
        return ApiResponse.created(
          res,
          { grievanceId: generateGrievanceId() },
          'Grievance submitted successfully'
        );
      }
      delete data.website_trap;

      const grievanceId = generateGrievanceId();
      const grievance = await Grievance.create({
        ...data,
        grievanceId,
        status: 'Open',
      });

      return ApiResponse.created(
        res,
        {
          grievanceId: grievance.grievanceId,
          subject: grievance.subject,
          createdAt: grievance.createdAt,
        },
        'Your grievance has been submitted successfully. Please save your Grievance Tracking ID.'
      );
    } catch (error) {
      next(error);
    }
  }

  // Public Track by Grievance ID
  static async trackGrievance(req, res, next) {
    try {
      const { grievanceId, phone } = req.query;

      if (!grievanceId) {
        throw ApiError.badRequest('Grievance ID is required for tracking');
      }

      const query = { grievanceId: grievanceId.trim().toUpperCase() };
      if (phone) {
        query.phone = phone.trim();
      }

      const grievance = await Grievance.findOne(query).select(
        'grievanceId subject category status createdAt resolvedAt internalNotes'
      );

      if (!grievance) {
        throw ApiError.notFound('No grievance found matching this tracking ID and phone number');
      }

      return ApiResponse.success(res, grievance, 'Grievance status retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Admin: Get all grievances
  static async getAllGrievances(req, res, next) {
    try {
      const { status, category, search, page = 1, limit = 15 } = req.query;
      const filter = {};

      if (status) filter.status = status;
      if (category) filter.category = category;
      if (search) {
        filter.$or = [
          { grievanceId: new RegExp(search, 'i') },
          { name: new RegExp(search, 'i') },
          { email: new RegExp(search, 'i') },
          { phone: new RegExp(search, 'i') },
          { subject: new RegExp(search, 'i') },
        ];
      }

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
      const skip = (pageNum - 1) * limitNum;

      const [grievances, total] = await Promise.all([
        Grievance.find(filter)
          .populate('resolvedBy', 'name email')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Grievance.countDocuments(filter),
      ]);

      return ApiResponse.success(
        res,
        grievances,
        'Grievances retrieved successfully',
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

  // Admin: Update grievance status and notes
  static async updateGrievance(req, res, next) {
    try {
      const { status, internalNotes } = req.body;
      const grievance = await Grievance.findById(req.params.id);

      if (!grievance) {
        throw ApiError.notFound('Grievance not found');
      }

      if (status) grievance.status = status;
      if (internalNotes !== undefined) grievance.internalNotes = internalNotes;

      if (status === 'Resolved' || status === 'Closed') {
        grievance.resolvedAt = new Date();
        grievance.resolvedBy = req.user.id;
      }

      await grievance.save();

      const populated = await Grievance.findById(grievance._id).populate('resolvedBy', 'name email');
      return ApiResponse.success(res, populated, 'Grievance updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
