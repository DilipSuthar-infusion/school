import express from 'express';
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  getExamsByClassId,
} from '../controllers/examController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';


const router = express.Router();


router.post('/', authenticate, authorizeRoles('teacher'), wrapAsync(createExam));
router.get('/',authenticate, authorizeRoles('admin','teacher','student'), getAllExams);
router.get('/:id',authenticate, authorizeRoles('teacher', 'student','admin'), getExamById);
router.put('/:id', authenticate, authorizeRoles('teacher'), updateExam);
router.delete('/:id',authenticate, authorizeRoles('teacher'), deleteExam);
router.get('/class/:classId',authenticate, authorizeRoles('student', 'teacher', 'admin'), getExamsByClassId);

export default router;
