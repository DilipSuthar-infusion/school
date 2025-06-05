import express from 'express';
import { createClass, assignClassTeacher, getAllClasses, getClassById, updateClass } from '../controllers/classController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

router.post('/', authenticate,authorizeRoles("admin"), wrapAsync(createClass));
router.get('/',authenticate,authorizeRoles("admin"),wrapAsync(getAllClasses));
router.get('/:id',authenticate,authorizeRoles("admin"),wrapAsync(getClassById));
router.patch('/:id', authenticate,authorizeRoles("admin"),wrapAsync(updateClass));
router.post('/assign-teacher', authenticate,authorizeRoles("admin"),wrapAsync(assignClassTeacher));
router.delete('/assign-teacher', authenticate,authorizeRoles("admin"),wrapAsync(assignClassTeacher));

export default router;
