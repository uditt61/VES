import express from 'express';
import { GrievanceController } from '../controllers/grievanceController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import { createGrievanceSchema, updateGrievanceSchema } from '../validators/grievanceValidator.js';

const router = express.Router();

// Public routes
router.post(
  '/',
  enquiryLimiter,
  validate(createGrievanceSchema),
  GrievanceController.submitGrievance
);

router.get('/track', GrievanceController.trackGrievance);

// Admin routes
router.get(
  '/',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  GrievanceController.getAllGrievances
);

router.patch(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  validate(updateGrievanceSchema),
  auditLogger('Updated Grievance Resolution', 'grievances'),
  GrievanceController.updateGrievance
);

export default router;
