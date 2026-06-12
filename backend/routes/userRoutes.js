import express from 'express';
import { createOrUpdateProfile } from '../controllers/userController.js';

const router = express.Router();

// Public route that frontend calls immediately after Supabase auth signup
router.post('/profile', createOrUpdateProfile);

export default router;
