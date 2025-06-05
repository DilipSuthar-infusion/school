// routes/feeRoutes.js
import express from 'express';
import { assignFeeToStudent, getStudentFees } from '../controllers/feeController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/assign/:studentId', authenticate, authorizeRoles('admin'), wrapAsync(assignFeeToStudent));
router.post('/:studentId',authenticate, authorizeRoles('admin'), wrapAsync(getStudentFees));

export default router;
