import express from 'express';
import { ContentController } from '../controllers/contentController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';
import { auditLogger } from '../middleware/auditLogger.js';

const router = express.Router();

router.get('/', ContentController.getAll);

router.put(
  '/:key',
  authenticateToken,
  authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'),
  auditLogger('Updated Website Content', 'content'),
  ContentController.updateKey
);

export default router;
