import { SocialWorkActivity } from '../models/SocialWorkActivity.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { slugify } from '../utils/slugify.js';

export class SocialWorkController {
  static async getAll(req, res, next) {
    try {
      const { active } = req.query;
      const filter = {};

      if (active !== undefined && req.user) {
        filter.isActive = active === 'true';
      } else if (!req.user) {
        filter.isActive = true;
      }

      const activities = await SocialWorkActivity.find(filter).sort({ date: -1 }).lean();
      return ApiResponse.success(res, activities, 'Social work activities retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const activity = await SocialWorkActivity.findOne({
        slug: req.params.slug,
        isActive: true,
      }).lean();

      if (!activity) {
        throw ApiError.notFound('Social work activity not found');
      }

      return ApiResponse.success(res, activity, 'Activity retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const data = { ...req.body };
      if (!data.slug) {
        data.slug = slugify(data.title);
      }

      let uniqueSlug = data.slug;
      let counter = 1;
      while (await SocialWorkActivity.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${data.slug}-${counter}`;
        counter++;
      }
      data.slug = uniqueSlug;

      const activity = await SocialWorkActivity.create(data);
      return ApiResponse.created(res, activity, 'Activity created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const data = { ...req.body };
      if (data.title && !data.slug) {
        data.slug = slugify(data.title);
      }

      const activity = await SocialWorkActivity.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      });

      if (!activity) {
        throw ApiError.notFound('Activity not found');
      }

      return ApiResponse.success(res, activity, 'Activity updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const activity = await SocialWorkActivity.findByIdAndDelete(req.params.id);
      if (!activity) {
        throw ApiError.notFound('Activity not found');
      }
      return ApiResponse.success(res, {}, 'Activity deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
