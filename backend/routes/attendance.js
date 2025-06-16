import express from 'express';
import {
  createAttendance,
  markBulkAttendance,
  getClassAttendanceByDate,
  getAllAttendance,
  getStudentAttendance,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendanceController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/', authenticate, authorizeRoles("teacher"), createAttendance);
router.post('/bulk', authenticate, authorizeRoles("teacher"), markBulkAttendance);

router.get('/class/:classId', getClassAttendanceByDate);
router.get('/',authenticate, authorizeRoles("teacher","admin"), getAllAttendance);
router.get('/student/:studentId', getStudentAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;
