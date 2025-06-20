import express from 'express';
import * as eventController from '../controllers/eventController.js'; // Adjust path as needed
import {authenticate, authorizeRoles} from '../middleware/auth.middleware.js';


const router = express.Router();


router.use(authenticate);



router.post('/',authenticate,authorizeRoles('admin'), eventController.createEvent);

router.get('/',authenticate,authorizeRoles('admin', 'teacher', 'student', 'parent'), eventController.getAllEvents);

router.put('/:id',authenticate,authorizeRoles('admin'), eventController.updateEvent);

router.delete('/:id',authenticate,authorizeRoles('admin'), eventController.deleteEvent);

export default router;
