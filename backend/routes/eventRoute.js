import express from 'express';
import * as eventController from '../controllers/eventController.js'; // Adjust path as needed
import {authenticate, authorizeRoles} from '../middleware/auth.middleware.js';


const router = express.Router();


router.use(authenticate);



router.post('/',authorizeRoles('admin'), eventController.createEvent);

router.get('/',authorizeRoles('admin', 'teacher', 'student', 'parent'), eventController.getAllEvents);

router.put('/:id', eventController.updateEvent);

router.delete('/:id', eventController.deleteEvent);

export default router;
