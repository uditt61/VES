import express from 'express';
import { AdminUserController } from '../controllers/adminUserController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import { createAdminUserSchema, updateAdminUserSchema } from '../validators/authValidator.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('SUPER_ADMIN', 'ADMIN'), AdminUserController.getAll);

router.post(
  '/',
  authorizeRoles('SUPER_ADMIN'),
  validate(createAdminUserSchema),
  auditLogger('Created Admin/Counsellor User', 'users'),
  AdminUserController.create
);

router.patch(
  '/:id',
  authorizeRoles('SUPER_ADMIN'),
  validate(updateAdminUserSchema),
  auditLogger('Updated Admin/Counsellor User', 'users'),
  AdminUserController.update
);

router.delete(
  '/:id',
  authorizeRoles('SUPER_ADMIN'),
  auditLogger('Deleted Admin/Counsellor User', 'users'),
  AdminUserController.delete
);

export default router;
