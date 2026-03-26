import express from 'express';
import { getAllContacts,getMessageByUserId,sendMessage,getAllPartners } from '../controllers/message.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();

//middleware
router.use(arcjetProtection, protectedRoute);



router.get('/contacts', getAllContacts);
router.get('/chats', getAllPartners);
router.get('/:id', getMessageByUserId);
router.post('/send/:id', sendMessage);



export default router;