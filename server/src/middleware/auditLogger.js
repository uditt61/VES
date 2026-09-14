import { AuditLog } from '../models/AuditLog.js';

export const auditLogger = (actionDescription, resourceName) => {
  return async (req, res, next) => {
    // Capture original res.json to log upon successful response
    const originalJson = res.json;

    res.json = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        // Fire and forget audit log creation without blocking the client response
        AuditLog.create({
          adminId: req.user.id,
          adminEmail: req.user.email,
          action: actionDescription || `${req.method} ${req.baseUrl}`,
          resource: resourceName || req.baseUrl.replace('/api/', ''),
          resourceId: req.params.id || data?.data?._id || '',
          details: {
            method: req.method,
            path: req.originalUrl,
            params: req.params,
            body: sanitizeBodyForAudit(req.body),
          },
          ipAddress: req.ip || req.connection.remoteAddress || '',
          userAgent: req.get('User-Agent') || '',
        }).catch((err) => console.error('AuditLog error:', err.message));
      }

      return originalJson.call(this, data);
    };

    next();
  };
};

function sanitizeBodyForAudit(body) {
  if (!body) return {};
  const sanitized = { ...body };
  if (sanitized.password) sanitized.password = '[REDACTED]';
  if (sanitized.website_trap) delete sanitized.website_trap;
  return sanitized;
}
