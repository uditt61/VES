import express from 'express';
import { FAQController } from '../controllers/faqController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import { auditLogger } from '../middleware/auditLogger.js';
import { createFaqSchema, updateFaqSchema } from '../validators/grievanceValidator.js';

const router = express.Router();

router.get('/', FAQController.getAll);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'),
  validate(createFaqSchema),
  auditLogger('Created FAQ', 'faqs'),
  FAQController.create
);

router.patch(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'),
  validate(updateFaqSchema),
  auditLogger('Updated FAQ', 'faqs'),
  FAQController.update
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'),
  auditLogger('Deleted FAQ', 'faqs'),
  FAQController.delete
);

export default router;
