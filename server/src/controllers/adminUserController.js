import { AdminUser } from '../models/AdminUser.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export class AdminUserController {
  static async getAll(req, res, next) {
    try {
      const users = await AdminUser.find()
        .select('-password')
        .sort({ createdAt: -1 })
        .lean();
      return ApiResponse.success(res, users, 'Admin users retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, email, password, role, phone } = req.body;

      const existing = await AdminUser.findOne({ email });
      if (existing) {
        throw ApiError.conflict('An account with this email already exists');
      }

      if (req.user.role !== 'SUPER_ADMIN' && role === 'SUPER_ADMIN') {
        throw ApiError.forbidden('Only Super Admins can create Super Admin accounts');
      }

      const user = await AdminUser.create({
        name,
        email,
        password,
        role: role || 'COUNSELLOR',
        phone: phone || '',
      });

      return ApiResponse.created(
        res,
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isActive: user.isActive,
        },
        'Admin user created successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const updates = { ...req.body };

      // Prevent self-deactivation of SUPER_ADMIN
      if (req.user.id === id && updates.isActive === false) {
        throw ApiError.badRequest('You cannot deactivate your own account');
      }

      const user = await AdminUser.findById(id);
      if (!user) {
        throw ApiError.notFound('Admin user not found');
      }

      // Non-super-admins cannot edit a SUPER_ADMIN account or elevate someone to SUPER_ADMIN
      if (user.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
        throw ApiError.forbidden('Only Super Admins can modify Super Admin accounts');
      }
      if (updates.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
        throw ApiError.forbidden('Only Super Admins can elevate accounts to Super Admin');
      }

      if (updates.name) user.name = updates.name;
      if (updates.role) user.role = updates.role;
      if (updates.phone !== undefined) user.phone = updates.phone;
      if (updates.isActive !== undefined) user.isActive = updates.isActive;
      if (updates.password) user.password = updates.password;

      await user.save();

      return ApiResponse.success(
        res,
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isActive: user.isActive,
        },
        'User updated successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { id } = req.params;
      const { newPassword } = req.body;

      const user = await AdminUser.findById(id);
      if (!user) {
        throw ApiError.notFound('Admin user not found');
      }

      // Non-super-admins cannot reset password for SUPER_ADMIN
      if (user.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
        throw ApiError.forbidden('Only Super Admins can reset Super Admin passwords');
      }

      user.password = newPassword;
      await user.save();

      return ApiResponse.success(
        res,
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        `Password reset successfully for ${user.email}`
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      if (req.user.id === id) {
        throw ApiError.badRequest('You cannot delete your own account');
      }

      const userToDelete = await AdminUser.findById(id);
      if (!userToDelete) {
        throw ApiError.notFound('User not found');
      }

      if (userToDelete.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
        throw ApiError.forbidden('Only Super Admins can delete Super Admin accounts');
      }

      await AdminUser.findByIdAndDelete(id);

      return ApiResponse.success(res, {}, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
