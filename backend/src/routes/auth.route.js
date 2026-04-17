import express from 'express';
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection);

router.post('/signup', signup);
router.post('/login',login);
router.post('/logout', logout);


//update profile pic route
router.put('/update-profile',protectedRoute, updateProfile);
router.get('/check', protectedRoute, (req,res) => res.status(200).json({message:"You are authenticated", user: req.user}))
export default router;