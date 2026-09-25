import express from 'express';
import { AdminUserController } from '../controllers/adminUserController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import {
  createAdminUserSchema,
  updateAdminUserSchema,
  adminResetPasswordSchema,
} from '../validators/authValidator.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('SUPER_ADMIN', 'ADMIN'), AdminUserController.getAll);

router.post(
  '/',
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(createAdminUserSchema),
  auditLogger('Created Admin/Staff User', 'users'),
  AdminUserController.create
);

router.patch(
  '/:id',
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(updateAdminUserSchema),
  auditLogger('Updated Admin/Staff User', 'users'),
  AdminUserController.update
);

router.post(
  '/:id/reset-password',
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(adminResetPasswordSchema),
  auditLogger('Reset Staff Password', 'users'),
  AdminUserController.resetPassword
);

router.delete(
  '/:id',
  authorizeRoles('SUPER_ADMIN'),
  auditLogger('Deleted Admin/Staff User', 'users'),
  AdminUserController.delete
);

export default router;
