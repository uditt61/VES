import { AuditLog } from '../models/AuditLog.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AuditLogController {
  static async getAll(req, res, next) {
    try {
      const { page = 1, limit = 20, resource, search } = req.query;
      const filter = {};

      if (resource) filter.resource = resource;
      if (search) {
        filter.$or = [
          { adminEmail: new RegExp(search, 'i') },
          { action: new RegExp(search, 'i') },
          { resource: new RegExp(search, 'i') },
          { ipAddress: new RegExp(search, 'i') },
        ];
      }

      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
      const skip = (pageNum - 1) * limitNum;

      const [logs, total] = await Promise.all([
        AuditLog.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .lean(),
        AuditLog.countDocuments(filter),
      ]);

      return ApiResponse.success(
        res,
        logs,
        'Audit logs retrieved',
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
}
