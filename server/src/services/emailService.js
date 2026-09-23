import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initTransporter();
  }

  initTransporter() {
    if (ENV.SMTP_USER && ENV.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: ENV.SMTP_HOST,
        port: ENV.SMTP_PORT,
        secure: ENV.SMTP_SECURE, // true for 465, false for 587
        auth: {
          user: ENV.SMTP_USER,
          pass: ENV.SMTP_PASS,
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
      });

      this.transporter.verify((error) => {
        if (error) {
          console.warn('⚠️ [EmailService] SMTP Connection Warning:', error.message);
        } else {
          console.log('✅ [EmailService] SMTP Transporter ready to send emails');
        }
      });
    } else {
      console.log('ℹ️ [EmailService] SMTP credentials not set. Emails will be logged to console in dev mode.');
    }
  }

  /**
   * Send Password Reset Email with 15-minute token link
   */
  async sendPasswordResetEmail({ to, name, resetUrl, expiresInMinutes = 15 }) {
    const subject = 'Password Reset Request - Vidhya Advance Portal';

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; color: #1e293b; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 32px 24px; text-align: center; }
    .header h1 { color: #f8fafc; font-size: 22px; margin: 0; font-weight: 700; letter-spacing: -0.5px; }
    .header p { color: #cbd5e1; font-size: 13px; margin: 6px 0 0 0; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 16px; }
    .message { font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
    .badge { display: inline-block; background-color: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
    .btn-container { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background: #ea580c; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3); }
    .alt-link { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 12px; word-break: break-all; color: #475569; margin-top: 20px; }
    .security-note { font-size: 12px; color: #64748b; line-height: 1.5; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 28px; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Vidhya Advance Portal</h1>
      <p>Administrative Account Security</p>
    </div>
    <div class="content">
      <div class="greeting">Hello ${name || 'Administrator'},</div>
      <p class="message">
        We received a request to reset the password for your staff account on the Vidhya Advance Education portal.
      </p>
      
      <div>
        <span class="badge">⏰ Link expires in ${expiresInMinutes} minutes</span>
      </div>

      <div class="btn-container">
        <a href="${resetUrl}" class="btn" target="_blank">Reset My Password</a>
      </div>

      <p class="message" style="margin-bottom: 8px;">
        If the button above does not work, copy and paste this link into your web browser:
      </p>
      <div class="alt-link">
        ${resetUrl}
      </div>

      <div class="security-note">
        <strong>🔒 Security Notice:</strong> If you did not request this password reset, please disregard this email. Your existing password will remain secure and unchanged.
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Vidhya Advance Education Social Welfare Society. Bhopal, MP, India.
    </div>
  </div>
</body>
</html>
    `;

    return this.sendMail({
      to,
      subject,
      text: `Hello ${name || 'Administrator'},\n\nPlease reset your Vidhya Advance Portal password using the link below (valid for ${expiresInMinutes} minutes):\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
      html,
    });
  }

  /**
   * Send New Admission Enquiry Notification to Admin
   */
  async sendEnquiryNotificationEmail({ enquiry, recipientEmail }) {
    const targetEmail = recipientEmail || ENV.ADMIN_NOTIFICATION_EMAIL || 'i.o.sakshamm@gmail.com';
    const subject = `🎓 New Admission Enquiry: ${enquiry.studentName || 'Student'} (${enquiry.enquiryId || 'New Lead'})`;

    const collegeName = enquiry.preferredCollege?.name || enquiry.preferredCollege || 'Not Specified';
    const courseName = enquiry.preferredCourse?.name || enquiry.preferredCourse || 'Not Specified';
    const enquiryPortalUrl = `${ENV.CLIENT_URL}/admin/enquiries`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #1e293b; }
    .container { max-width: 640px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: #0f172a; padding: 24px 28px; border-bottom: 3px solid #ea580c; }
    .header h2 { color: #f8fafc; margin: 0; font-size: 20px; font-weight: 700; }
    .header span { color: #ea580c; font-weight: 800; }
    .header p { color: #94a3b8; font-size: 13px; margin: 4px 0 0 0; }
    .body { padding: 28px; }
    .alert-badge { display: inline-flex; align-items: center; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; border-radius: 8px; padding: 6px 14px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
    .lead-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
    .lead-row { display: flex; border-bottom: 1px solid #e2e8f0; }
    .lead-row:last-child { border-bottom: none; }
    .lead-label { width: 35%; background: #f1f5f9; padding: 12px 16px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
    .lead-value { width: 65%; padding: 12px 16px; font-size: 13px; color: #0f172a; font-weight: 500; }
    .lead-value a { color: #ea580c; text-decoration: none; font-weight: 600; }
    .btn-action { display: inline-block; background: #0f172a; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; text-align: center; }
    .footer { background: #f1f5f9; padding: 16px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Vidhya <span>Advance</span> Admissions</h2>
      <p>Instant Admission Lead Notification</p>
    </div>
    <div class="body">
      <div class="alert-badge">
        🔔 New Online Enquiry Received &bull; Ref: ${enquiry.enquiryId || 'N/A'}
      </div>

      <div class="lead-card">
        <table style="width:100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="width:35%; background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">STUDENT NAME</td>
            <td style="padding:10px 14px; font-size:14px; font-weight:700; color:#0f172a;">${enquiry.studentName || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">PHONE NUMBER</td>
            <td style="padding:10px 14px; font-size:14px; font-weight:600; color:#ea580c;">
              <a href="tel:${enquiry.phone}" style="color:#ea580c; text-decoration:none;">📞 ${enquiry.phone || 'N/A'}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">EMAIL</td>
            <td style="padding:10px 14px; font-size:13px; color:#0f172a;">
              ${enquiry.email ? `<a href="mailto:${enquiry.email}" style="color:#2563eb; text-decoration:none;">${enquiry.email}</a>` : 'Not Provided'}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">COURSE DESIRED</td>
            <td style="padding:10px 14px; font-size:13px; font-weight:600; color:#0f172a;">${courseName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">PREFERRED COLLEGE</td>
            <td style="padding:10px 14px; font-size:13px; color:#0f172a;">${collegeName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">LOCATION</td>
            <td style="padding:10px 14px; font-size:13px; color:#0f172a;">${enquiry.city ? `${enquiry.city}, ${enquiry.state || ''}` : enquiry.state || 'Not Provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">QUALIFICATION</td>
            <td style="padding:10px 14px; font-size:13px; color:#0f172a;">
              ${enquiry.highestQualification || 'N/A'} ${enquiry.passingYear ? `(${enquiry.passingYear})` : ''} ${enquiry.percentage ? `- ${enquiry.percentage}%` : ''}
            </td>
          </tr>
          ${enquiry.message ? `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">MESSAGE / QUERY</td>
            <td style="padding:10px 14px; font-size:13px; color:#334155; font-style: italic;">"${enquiry.message}"</td>
          </tr>
          ` : ''}
          <tr>
            <td style="background:#f8fafc; padding:10px 14px; font-size:12px; font-weight:700; color:#475569;">RECEIVED AT</td>
            <td style="padding:10px 14px; font-size:12px; color:#64748b;">${new Date(enquiry.createdAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${enquiryPortalUrl}" class="btn-action" target="_blank">Open Enquiry Manager</a>
      </div>
    </div>
    <div class="footer">
      This is an automated notification from Vidhya Advance Education Society Portal.
    </div>
  </div>
</body>
</html>
    `;

    return this.sendMail({
      to: targetEmail,
      subject,
      text: `New Admission Enquiry!\n\nStudent: ${enquiry.studentName}\nPhone: ${enquiry.phone}\nEmail: ${enquiry.email || 'N/A'}\nCourse: ${courseName}\nCollege: ${collegeName}\nLocation: ${enquiry.city || ''} ${enquiry.state || ''}\n\nView details: ${enquiryPortalUrl}`,
      html,
    });
  }

  /**
   * Internal generic mail dispatcher
   */
  async sendMail({ to, subject, text, html }) {
    try {
      if (this.transporter) {
        const info = await this.transporter.sendMail({
          from: ENV.EMAIL_FROM,
          to,
          subject,
          text,
          html,
        });
        console.log(`📧 [EmailService] Email sent successfully to ${to} (Message ID: ${info.messageId})`);
        return { success: true, messageId: info.messageId };
      } else {
        // Fallback Development Logging
        console.log('\n======================================================');
        console.log('📧 [EmailService - DEV MODE EMULATION]');
        console.log(`To:      ${to}`);
        console.log(`From:    ${ENV.EMAIL_FROM}`);
        console.log(`Subject: ${subject}`);
        console.log('------------------------------------------------------');
        console.log(text);
        console.log('======================================================\n');
        return { success: true, emulated: true };
      }
    } catch (error) {
      console.error(`❌ [EmailService Error] Failed to send email to ${to}:`, error.message);
      return { success: false, error: error.message };
    }
  }
}

export const emailService = new EmailService();
