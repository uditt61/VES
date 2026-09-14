import express from 'express';
import { EnquiryController } from '../controllers/enquiryController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import {
  createEnquirySchema,
  updateEnquiryStatusSchema,
  addEnquiryNoteSchema,
} from '../validators/enquiryValidator.js';

const router = express.Router();

// Public Admission Enquiry Submission
router.post(
  '/',
  enquiryLimiter,
  validate(createEnquirySchema),
  EnquiryController.createEnquiry
);

// Admin Lead Management
router.get(
  '/',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'COUNSELLOR'),
  EnquiryController.getAllEnquiries
);

router.get(
  '/export/csv',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN'),
  auditLogger('Exported Leads to CSV', 'enquiries'),
  EnquiryController.exportCSV
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'COUNSELLOR'),
  EnquiryController.getEnquiryById
);

router.patch(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'COUNSELLOR'),
  validate(updateEnquiryStatusSchema),
  auditLogger('Updated Enquiry Status/Details', 'enquiries'),
  EnquiryController.updateEnquiry
);

router.post(
  '/:id/notes',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'COUNSELLOR'),
  validate(addEnquiryNoteSchema),
  auditLogger('Added Note to Enquiry', 'enquiries'),
  EnquiryController.addNote
);

export default router;
