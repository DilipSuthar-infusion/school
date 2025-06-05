import express from 'express';
import {
  addFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
} from '../controllers/feeStructureController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';


const router = express.Router();


router.post('/add', authenticate, authorizeRoles('admin'), wrapAsync(addFeeStructure));
router.put('/fee-structures/:id', authenticate, authorizeRoles('admin'), wrapAsync(updateFeeStructure));
router.delete('/fee-structures/:id',authenticate, authorizeRoles('admin'), wrapAsync(deleteFeeStructure));

export default router;
