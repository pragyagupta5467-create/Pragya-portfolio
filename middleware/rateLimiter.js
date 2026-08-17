/**
 * In-memory rate limiting middleware for API routes (e.g., /api/contact)
 */

const ipRequestMap = new Map();

// Default limits: max 5 requests per 15 minutes per IP
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

// Periodic cleanup of expired IP tracking records to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestMap.entries()) {
    if (now - record.startTime > WINDOW_MS) {
      ipRequestMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

/**
 * Express middleware for rate limiting contact submissions
 */
export function contactRateLimiter(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const record = ipRequestMap.get(ip);

  if (!record) {
    ipRequestMap.set(ip, {
      count: 1,
      startTime: now
    });
    return next();
  }

  // Check if current window has expired
  if (now - record.startTime > WINDOW_MS) {
    record.count = 1;
    record.startTime = now;
    return next();
  }

  // Increment request count in current window
  record.count += 1;

  if (record.count > MAX_REQUESTS) {
    const remainingSecs = Math.ceil((WINDOW_MS - (now - record.startTime)) / 1000);
    console.warn(`⚠️ Rate limit exceeded for IP: ${ip}`);
    return res.status(429).json({
      success: false,
      message: `Too many contact requests from this IP. Please try again in ${Math.ceil(remainingSecs / 60)} minutes.`
    });
  }

  next();
}
