import crypto from 'crypto';
import { AdminUser } from '../models/AdminUser.js';
import { TokenService } from '../services/tokenService.js';
import { emailService } from '../services/emailService.js';
import { ENV } from '../config/env.js';
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

  static async updateProfile(req, res, next) {
    try {
      const { name, email, phone } = req.body;
      const user = await AdminUser.findById(req.user.id);
      if (!user) {
        throw ApiError.notFound('User not found');
      }

      if (email && email.trim().toLowerCase() !== user.email) {
        const normalizedEmail = email.trim().toLowerCase();
        const existing = await AdminUser.findOne({
          email: normalizedEmail,
          _id: { $ne: user._id },
        });
        if (existing) {
          throw ApiError.conflict('An account with this email address already exists');
        }
        user.email = normalizedEmail;
      }

      if (name && name.trim()) {
        user.name = name.trim();
      }

      if (phone !== undefined) {
        user.phone = phone.trim();
      }

      await user.save();

      return ApiResponse.success(
        res,
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        'Profile details updated successfully'
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

  /**
   * Request Password Reset Link (Sends 15-minute expiring link to admin's email)
   */
  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const normalizedEmail = (email || '').trim().toLowerCase();

      const user = await AdminUser.findOne({ email: normalizedEmail, isActive: true });

      // If user exists, generate reset token and dispatch email
      if (user) {
        const resetToken = user.createPasswordResetToken(15);
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${ENV.CLIENT_URL}/admin/reset-password?token=${resetToken}`;

        // Send email in background / handled
        await emailService.sendPasswordResetEmail({
          to: user.email,
          name: user.name,
          resetUrl,
          expiresInMinutes: 15,
        });
      }

      // Always return generic success message to prevent user enumeration attacks
      return ApiResponse.success(
        res,
        {},
        'If your email is registered with an active staff account, you will receive a password reset link shortly (valid for 15 minutes).'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reset Password with valid 15-minute token
   */
  static async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;

      if (!token) {
        throw ApiError.badRequest('Reset token is required');
      }

      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await AdminUser.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
        isActive: true,
      }).select('+resetPasswordToken +resetPasswordExpire');

      if (!user) {
        throw ApiError.badRequest(
          'Password reset link is invalid or has expired (links are valid for 15 minutes). Please request a new one.'
        );
      }

      // Set new password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      // Revoke all active sessions for security
      await TokenService.revokeAllUserRefreshTokens(user._id);

      return ApiResponse.success(
        res,
        {},
        'Password has been reset successfully! You can now log in with your new credentials.'
      );
    } catch (error) {
      next(error);
    }
  }
}

