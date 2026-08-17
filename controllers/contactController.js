import { validateContactInput } from '../utils/validation.js';
import { sendContactEmail } from '../services/emailService.js';

/**
 * Controller handling POST /api/contact submissions
 */
export async function handleContactSubmit(req, res, next) {
  try {
    const { name, email, subject, message } = req.body || {};

    // 1. Validate & Sanitize Input
    const validation = validateContactInput({ name, email, subject, message });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors[0] || 'Invalid contact form data provided.'
      });
    }

    // 2. Dispatch Email via Nodemailer service
    await sendContactEmail(validation.sanitized);

    // 3. Success Response
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.'
    });

  } catch (error) {
    // Pass error to error handling middleware for logging without exposing credentials
    next(error);
  }
}
