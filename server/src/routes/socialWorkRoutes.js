import express from 'express';
import { SocialWorkController } from '../controllers/socialWorkController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { auditLogger } from '../middleware/auditLogger.js';

const router = express.Router();

router.get('/', SocialWorkController.getAll);
router.get('/:slug', SocialWorkController.getBySlug);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'),
  auditLogger('Created Social Work Activity', 'social-work'),
  SocialWorkController.create
);

router.patch(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'),
  auditLogger('Updated Social Work Activity', 'social-work'),
  SocialWorkController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'),
  auditLogger('Deleted Social Work Activity', 'social-work'),
  SocialWorkController.delete
);

export default router;
