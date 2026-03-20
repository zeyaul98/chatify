import express from 'express';
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();



router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);


//update profile pic route
router.put('/profile-pic',protectedRoute, updateProfile);
export default router;