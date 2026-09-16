import { WebsiteContent } from '../models/WebsiteContent.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export class ContentController {
  static async getAll(req, res, next) {
    try {
      const contents = await WebsiteContent.find().lean();
      // Format as key-value map for ease of consumption
      const contentMap = {};
      contents.forEach((item) => {
        contentMap[item.key] = item.value;
      });
      return ApiResponse.success(res, contentMap, 'Website content retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async updateKey(req, res, next) {
    try {
      const { key } = req.params;
      const { value, description } = req.body;

      if (value === undefined) {
        throw ApiError.badRequest('Value is required');
      }

      const content = await WebsiteContent.findOneAndUpdate(
        { key },
        {
          value,
          description: description || '',
          lastUpdatedBy: req.user ? req.user.name : 'Admin',
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      return ApiResponse.success(res, content, `Content for ${key} updated`);
    } catch (error) {
      next(error);
    }
  }
}
