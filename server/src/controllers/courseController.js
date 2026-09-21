import { Course } from '../models/Course.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { slugify } from '../utils/slugify.js';
import { escapeRegex } from '../utils/sanitize.js';

export class CourseController {
  static async getAll(req, res, next) {
    try {
      const {
        search,
        college,
        degreeType,
        stream,
        admissionStatus,
        featured,
        active,
        page = 1,
        limit = 12,
        sort = 'createdAt',
        order = 'desc',
      } = req.query;

      const filter = {};

      if (active !== undefined && req.user) {
        filter.isActive = active === 'true';
      } else if (!req.user) {
        filter.isActive = true;
      }

      if (college) {
        filter.college = college;
      }

      if (degreeType) {
        filter.degreeType = degreeType;
      }

      if (stream) {
        filter.stream = stream;
      }

      if (admissionStatus) {
        filter.admissionStatus = admissionStatus;
      }

      if (featured !== undefined) {
        filter.isFeatured = featured === 'true';
      }

      if (search) {
        const safeSearch = escapeRegex(search);
        filter.$or = [
          { name: new RegExp(safeSearch, 'i') },
          { degreeType: new RegExp(safeSearch, 'i') },
          { stream: new RegExp(safeSearch, 'i') },
          { description: new RegExp(safeSearch, 'i') },
        ];
      }

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
      const skip = (pageNum - 1) * limitNum;

      const sortOrder = order === 'asc' ? 1 : -1;
      const sortObj = { [sort]: sortOrder };

      const [courses, total] = await Promise.all([
        Course.find(filter)
          .populate('college', 'name slug logo location type')
          .sort(sortObj)
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Course.countDocuments(filter),
      ]);

      return ApiResponse.success(
        res,
        courses,
        'Courses retrieved successfully',
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

  static async getById(req, res, next) {
    try {
      const course = await Course.findById(req.params.id).populate(
        'college',
        'name slug logo coverImage location website contactPhone contactEmail'
      );
      if (!course) {
        throw ApiError.notFound('Course not found');
      }
      return ApiResponse.success(res, course, 'Course details retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const data = { ...req.body };
      if (!data.slug) {
        data.slug = slugify(`${data.name}-${data.degreeType}`);
      }

      const course = await Course.create(data);
      const populatedCourse = await Course.findById(course._id).populate('college', 'name slug');
      return ApiResponse.created(res, populatedCourse, 'Course created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const data = { ...req.body };
      if (data.name && !data.slug) {
        data.slug = slugify(`${data.name}-${data.degreeType || ''}`);
      }

      const course = await Course.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      }).populate('college', 'name slug');

      if (!course) {
        throw ApiError.notFound('Course not found');
      }

      return ApiResponse.success(res, course, 'Course updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { permanent } = req.query;

      if (permanent === 'true') {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
          throw ApiError.notFound('Course not found');
        }
        return ApiResponse.success(res, {}, 'Course permanently deleted');
      }

      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!course) {
        throw ApiError.notFound('Course not found');
      }

      return ApiResponse.success(res, course, 'Course deactivated successfully');
    } catch (error) {
      next(error);
    }
  }
}
