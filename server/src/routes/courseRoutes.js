import express from 'express';
import { CourseController } from '../controllers/courseController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import { createCourseSchema, updateCourseSchema } from '../validators/courseValidator.js';

const router = express.Router();

// Public routes
router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);

// Admin routes
router.post(
  '/',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(createCourseSchema),
  auditLogger('Created Course', 'courses'),
  CourseController.create
);

router.patch(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(updateCourseSchema),
  auditLogger('Updated Course', 'courses'),
  CourseController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  auditLogger('Deleted/Deactivated Course', 'courses'),
  CourseController.delete
);

export default router;
