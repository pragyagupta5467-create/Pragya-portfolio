import express from 'express';
import { handleContactSubmit } from '../controllers/contactController.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/contact
router.post('/contact', contactRateLimiter, handleContactSubmit);

export default router;
