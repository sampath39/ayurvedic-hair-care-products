import express from 'express';
import { createOrder, getUserOrders, getOrderById, updateOrderStatus, getAllOrders, getAnalytics } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.route('/myorders')
  .get(protect, getUserOrders);

router.route('/analytics')
  .get(protect, admin, getAnalytics);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

export default router;
