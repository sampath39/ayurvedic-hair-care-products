import express from 'express';
import { createOrUpdateProfile, getAllUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route that frontend calls immediately after Supabase auth signup
router.post('/profile', createOrUpdateProfile);

router.route('/')
  .get(protect, admin, getAllUsers);

export default router;
