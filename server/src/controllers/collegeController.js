import { College } from '../models/College.js';
import { Course } from '../models/Course.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { slugify } from '../utils/slugify.js';

export class CollegeController {
  // Public & Admin List
  static async getAll(req, res, next) {
    try {
      const {
        search,
        city,
        state,
        type,
        affiliation,
        featured,
        active,
        page = 1,
        limit = 12,
        sort = 'createdAt',
        order = 'desc',
      } = req.query;

      const filter = {};

      // Public users only see active colleges unless user is authenticated admin
      if (active !== undefined && req.user) {
        filter.isActive = active === 'true';
      } else if (!req.user) {
        filter.isActive = true;
      }

      if (featured !== undefined) {
        filter.isFeatured = featured === 'true';
      }

      if (type) {
        filter.type = type;
      }

      if (city) {
        filter['location.city'] = new RegExp(city, 'i');
      }

      if (state) {
        filter['location.state'] = new RegExp(state, 'i');
      }

      if (affiliation) {
        filter.affiliations = { $in: [new RegExp(affiliation, 'i')] };
      }

      if (search) {
        filter.$or = [
          { name: new RegExp(search, 'i') },
          { 'location.city': new RegExp(search, 'i') },
          { 'location.state': new RegExp(search, 'i') },
          { affiliations: new RegExp(search, 'i') },
          { accreditations: new RegExp(search, 'i') },
        ];
      }

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
      const skip = (pageNum - 1) * limitNum;

      const sortOrder = order === 'asc' ? 1 : -1;
      const sortObj = { [sort]: sortOrder };

      const [colleges, total] = await Promise.all([
        College.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
        College.countDocuments(filter),
      ]);

      return ApiResponse.success(
        res,
        colleges,
        'Colleges retrieved successfully',
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

  // Public Get by Slug with Courses
  static async getBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const college = await College.findOne({ slug, isActive: true }).lean();

      if (!college) {
        throw ApiError.notFound('College or University not found');
      }

      // Fetch active courses for this college
      const courses = await Course.find({ college: college._id, isActive: true }).lean();

      return ApiResponse.success(
        res,
        {
          ...college,
          courses,
        },
        'College details retrieved'
      );
    } catch (error) {
      next(error);
    }
  }

  // Admin Get by ID
  static async getById(req, res, next) {
    try {
      const college = await College.findById(req.params.id);
      if (!college) {
        throw ApiError.notFound('College not found');
      }
      return ApiResponse.success(res, college, 'College retrieved');
    } catch (error) {
      next(error);
    }
  }

  // Admin Create College
  static async create(req, res, next) {
    try {
      const data = { ...req.body };
      if (!data.slug) {
        data.slug = slugify(data.name);
      }

      // Ensure slug uniqueness
      let uniqueSlug = data.slug;
      let counter = 1;
      while (await College.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${data.slug}-${counter}`;
        counter++;
      }
      data.slug = uniqueSlug;

      const college = await College.create(data);
      return ApiResponse.created(res, college, 'College created successfully');
    } catch (error) {
      next(error);
    }
  }

  // Admin Update College
  static async update(req, res, next) {
    try {
      const data = { ...req.body };
      if (data.name && !data.slug) {
        data.slug = slugify(data.name);
      }

      const college = await College.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      });

      if (!college) {
        throw ApiError.notFound('College not found');
      }

      return ApiResponse.success(res, college, 'College updated successfully');
    } catch (error) {
      next(error);
    }
  }

  // Admin Delete / Soft Delete College
  static async delete(req, res, next) {
    try {
      const { permanent } = req.query;

      if (permanent === 'true') {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) {
          throw ApiError.notFound('College not found');
        }
        // Also remove associated courses
        await Course.deleteMany({ college: college._id });
        return ApiResponse.success(res, {}, 'College permanently deleted');
      }

      // Soft delete: toggle isActive = false
      const college = await College.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!college) {
        throw ApiError.notFound('College not found');
      }

      return ApiResponse.success(res, college, 'College deactivated successfully');
    } catch (error) {
      next(error);
    }
  }
}
