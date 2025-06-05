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

const router = express.Router();


router.post('/', createAttendance);
router.post('/bulk', markBulkAttendance);
router.get('/class/:classId', getClassAttendanceByDate);
router.get('/', getAllAttendance);
router.get('/student/:studentId', getStudentAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;
