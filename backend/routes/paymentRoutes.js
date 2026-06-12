import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/order').post(protect, createRazorpayOrder);
router.route('/verify').post(protect, verifyRazorpayPayment);

export default router;
