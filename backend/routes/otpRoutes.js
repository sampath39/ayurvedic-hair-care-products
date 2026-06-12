import express from 'express';
import { sendOtp, verifyOtp } from '../controllers/otpController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, admin, sendOtp);
router.post('/verify', protect, admin, verifyOtp);

export default router;
