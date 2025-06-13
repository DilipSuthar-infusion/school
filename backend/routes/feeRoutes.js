// routes/feeRoutes.js
import express from 'express';
import { assignFeeToStudent, getAllStudentFees, getStudentFees } from '../controllers/feeController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/:studentId', authenticate, authorizeRoles('admin'), wrapAsync(assignFeeToStudent));
router.get('/',authenticate, authorizeRoles("admin"),wrapAsync(getAllStudentFees))

export default router;
