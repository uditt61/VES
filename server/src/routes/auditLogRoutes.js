import express from 'express';
import { AuditLogController } from '../controllers/auditLogController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/rbac.js';

const router = express.Router();

router.use(authenticateToken);
router.get('/', authorizeRoles('SUPER_ADMIN'), AuditLogController.getAll);

export default router;
