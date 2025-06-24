import express from 'express';
import {
  createExam,
  getAllExams,
  getExamById,
  deleteExam,
  getExamsByClassId,
} from '../controllers/examController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';


const router = express.Router();


router.post('/', authenticate, authorizeRoles('admin'), wrapAsync(createExam));
router.get('/',authenticate, authorizeRoles('admin','teacher','student'), getAllExams);
router.get('/:id',authenticate, authorizeRoles('teacher', 'student','admin'), getExamById);

router.delete('/:id',authenticate, authorizeRoles('admin'), deleteExam);
router.get('/class/:classId',authenticate, authorizeRoles('student', 'teacher', 'admin'), getExamsByClassId);

export default router;
