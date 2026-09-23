import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ENV } from '../config/env.js';
import { RefreshToken } from '../models/RefreshToken.js';

export class TokenService {
  static generateAccessToken(user) {
    const payload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  static async createRefreshToken(userId) {
    // Generate a random high-entropy token
    const token = crypto.randomBytes(40).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Default 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await RefreshToken.create({
      tokenHash,
      userId,
      expiresAt,
    });

    return token;
  }

  static async verifyAndRotateRefreshToken(rawToken) {
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const existingToken = await RefreshToken.findOne({ tokenHash }).populate('userId');

    if (!existingToken) {
      return null;
    }

    // Token reuse detection: if token is already revoked, revoke all tokens for this user
    if (existingToken.isRevoked) {
      await RefreshToken.updateMany({ userId: existingToken.userId }, { isRevoked: true });
      return null;
    }

    // Check expiry
    if (new Date() > existingToken.expiresAt) {
      existingToken.isRevoked = true;
      await existingToken.save();
      return null;
    }

    // Issue new token and revoke old one
    const newRawToken = crypto.randomBytes(40).toString('hex');
    const newTokenHash = crypto.createHash('sha256').update(newRawToken).digest('hex');

    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    await RefreshToken.create({
      tokenHash: newTokenHash,
      userId: existingToken.userId._id,
      expiresAt: newExpiresAt,
    });

    existingToken.isRevoked = true;
    existingToken.replacedByToken = newTokenHash;
    await existingToken.save();

    return {
      user: existingToken.userId,
      newRefreshToken: newRawToken,
    };
  }

  static async revokeRefreshToken(rawToken) {
    if (!rawToken) return;
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    await RefreshToken.updateOne({ tokenHash }, { isRevoked: true });
  }

  static async revokeAllUserRefreshTokens(userId) {
    if (!userId) return;
    await RefreshToken.updateMany({ userId }, { isRevoked: true });
  }


  static setRefreshTokenCookie(res, token) {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: ENV.COOKIE_SECURE,
      sameSite: ENV.COOKIE_SAME_SITE,
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: ENV.COOKIE_DOMAIN || undefined,
    });
  }

  static clearRefreshTokenCookie(res) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: ENV.COOKIE_SECURE,
      sameSite: ENV.COOKIE_SAME_SITE,
      path: '/api/auth',
      domain: ENV.COOKIE_DOMAIN || undefined,
    });
  }
}
