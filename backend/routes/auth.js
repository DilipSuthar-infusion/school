import express from 'express';
import { login } from '../controllers/authController.js'; // Adjust the path as necessary
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

// Auth Routes

router.post('/login',wrapAsync(login));

export default router;
