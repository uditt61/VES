import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authLimiter, refreshLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import { loginSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, updateProfileSchema } from '../validators/authValidator.js';

const router = express.Router();

router.post('/login', authLimiter, validate(loginSchema), AuthController.login);
router.post('/refresh', refreshLimiter, AuthController.refresh);
router.post('/logout', AuthController.logout);
router.get('/me', authenticateToken, AuthController.getMe);
router.put(
  '/profile',
  authenticateToken,
  validate(updateProfileSchema),
  auditLogger('Updated Personal Profile / Email', 'auth'),
  AuthController.updateProfile
);
router.post(
  '/change-password',
  authenticateToken,
  validate(changePasswordSchema),
  auditLogger('Changed Personal Password', 'auth'),
  AuthController.changePassword
);
router.post(
  '/forgot-password',
  authLimiter,
  validate(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post(
  '/reset-password',
  authLimiter,
  validate(resetPasswordSchema),
  auditLogger('Reset Password via Token', 'auth'),
  AuthController.resetPassword
);

export default router;

