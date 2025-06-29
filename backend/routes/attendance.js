import express from 'express';
import {
  createAttendance,
  markBulkAttendance,
  getClassAttendanceByDate,
  getAllAttendance,
  deleteYearlyAttendance,
  getMonthlyAttendance,
} from '../controllers/attendanceController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/', authenticate, authorizeRoles("teacher"), createAttendance);
router.post('/bulk', authenticate, authorizeRoles("teacher"), markBulkAttendance);
router.get('/:classId', authenticate, authorizeRoles("teacher"), getMonthlyAttendance);
router.get('/class/:classId', getClassAttendanceByDate);
router.get('/',authenticate, authorizeRoles("teacher","admin","student"), getAllAttendance);
router.delete(
  '/class/:classId/year/:year',
  authenticate,
  authorizeRoles('teacher', 'admin'),
  deleteYearlyAttendance
);

export default router;
