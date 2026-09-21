import { AdminUser } from '../models/AdminUser.js';
import { TokenService } from '../services/tokenService.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await AdminUser.findOne({ email }).select('+password');
      if (!user) {
        throw ApiError.unauthorized('Invalid email or password');
      }

      if (!user.isActive) {
        throw ApiError.forbidden('Your account has been deactivated. Please contact an administrator.');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw ApiError.unauthorized('Invalid email or password');
      }

      // Generate Access Token & Refresh Token
      const accessToken = TokenService.generateAccessToken(user);
      const refreshToken = await TokenService.createRefreshToken(user._id);

      // Set Refresh Token in secure HTTP-only cookie
      TokenService.setRefreshTokenCookie(res, refreshToken);

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      return ApiResponse.success(
        res,
        {
          accessToken,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        'Logged in successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const rawRefreshToken = req.cookies?.refreshToken;
      if (!rawRefreshToken) {
        throw ApiError.unauthorized('Refresh token missing');
      }

      const result = await TokenService.verifyAndRotateRefreshToken(rawRefreshToken);
      if (!result) {
        TokenService.clearRefreshTokenCookie(res);
        throw ApiError.unauthorized('Invalid or expired refresh token. Please sign in again.');
      }

      const { user, newRefreshToken } = result;

      // Set rotated cookie
      TokenService.setRefreshTokenCookie(res, newRefreshToken);

      const accessToken = TokenService.generateAccessToken(user);

      return ApiResponse.success(
        res,
        {
          accessToken,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        'Token refreshed successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      const rawRefreshToken = req.cookies?.refreshToken;
      if (rawRefreshToken) {
        await TokenService.revokeRefreshToken(rawRefreshToken);
      }
      TokenService.clearRefreshTokenCookie(res);
      return ApiResponse.success(res, {}, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req, res, next) {
    try {
      const user = await AdminUser.findById(req.user.id);
      if (!user) {
        throw ApiError.notFound('User not found');
      }

      return ApiResponse.success(
        res,
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          lastLogin: user.lastLogin,
        },
        'User profile retrieved'
      );
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await AdminUser.findById(req.user.id).select('+password');
      if (!user) {
        throw ApiError.notFound('User not found');
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        throw ApiError.badRequest('Current password is incorrect');
      }

      if (currentPassword === newPassword) {
        throw ApiError.badRequest('New password must be different from your current password');
      }

      user.password = newPassword;
      await user.save();

      return ApiResponse.success(res, {}, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }
}
