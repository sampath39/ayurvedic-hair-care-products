import express from 'express';
import { updateDeliveryStatus, getDeliveryStatus } from '../controllers/deliveryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:orderId')
  .get(protect, getDeliveryStatus)
  .put(protect, admin, updateDeliveryStatus);

export default router;
