import express from 'express';
import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
  getResultsByStudentId, // import the new function
} from '../controllers/examResultController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';


const router = express.Router();


router.post('/', authenticate, authorizeRoles('teacher'), wrapAsync(createResult));
router.get('/',authenticate, authorizeRoles('teacher','admin'), getAllResults);
router.get('/:id',authenticate, authorizeRoles('teacher'), getResultById);
router.put('/:id', authenticate, authorizeRoles('teacher'), updateResult);
router.delete('/:id',authenticate, authorizeRoles('teacher'), deleteResult);
router.get('/student/:studentId',authenticate, authorizeRoles('teacher','student','parent'), getResultsByStudentId);

export default router;
