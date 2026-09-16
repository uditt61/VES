import express from 'express';
import { CollegeController } from '../controllers/collegeController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import { createCollegeSchema, updateCollegeSchema } from '../validators/collegeValidator.js';

const router = express.Router();

// Public routes
router.get('/', CollegeController.getAll);
router.get('/slug/:slug', CollegeController.getBySlug);

// Admin routes
router.get('/:id', authenticateToken, CollegeController.getById);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(createCollegeSchema),
  auditLogger('Created College', 'colleges'),
  CollegeController.create
);

router.patch(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(updateCollegeSchema),
  auditLogger('Updated College', 'colleges'),
  CollegeController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  auditLogger('Deleted/Deactivated College', 'colleges'),
  CollegeController.delete
);

export default router;
