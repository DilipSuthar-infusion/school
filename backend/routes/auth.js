import express from 'express';
import { getCurrentUser, login } from '../controllers/authController.js'; // Adjust the path as necessary
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

// Auth Routes

router.post('/login',wrapAsync(login));
router.get('/me', getCurrentUser);

export default router;
