import express from 'express';
import { getCurrentUser, login, logoutUser } from '../controllers/authController.js'; // Adjust the path as necessary
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

// Auth Routes

router.post('/login',wrapAsync(login));
router.post('/logout', logoutUser);
router.get('/me', getCurrentUser);

export default router;
