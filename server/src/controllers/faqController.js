import { FAQ } from '../models/FAQ.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export class FAQController {
  static async getAll(req, res, next) {
    try {
      const { category, search, active } = req.query;
      const filter = {};

      if (active !== undefined && req.user) {
        filter.isActive = active === 'true';
      } else if (!req.user) {
        filter.isActive = true;
      }

      if (category) {
        filter.category = category;
      }

      if (search) {
        filter.$or = [
          { question: new RegExp(search, 'i') },
          { answer: new RegExp(search, 'i') },
        ];
      }

      const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: -1 }).lean();
      return ApiResponse.success(res, faqs, 'FAQs retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const faq = await FAQ.create(req.body);
      return ApiResponse.created(res, faq, 'FAQ created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!faq) {
        throw ApiError.notFound('FAQ not found');
      }

      return ApiResponse.success(res, faq, 'FAQ updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const faq = await FAQ.findByIdAndDelete(req.params.id);
      if (!faq) {
        throw ApiError.notFound('FAQ not found');
      }
      return ApiResponse.success(res, {}, 'FAQ deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
