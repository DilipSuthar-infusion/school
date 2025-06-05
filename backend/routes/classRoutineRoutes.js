import express from 'express';
import { createClassRoutine, getAllClassRoutines, updateClassRoutine, deleteClassRoutine} from '../controllers/classRoutineController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', authenticate,authorizeRoles("admin"), createClassRoutine);
router.get('/',authenticate,authorizeRoles("admin", "teacher", "student"), getAllClassRoutines);
router.put('/:id', authenticate,authorizeRoles("admin"), updateClassRoutine); 
router.delete('/:id',authenticate,authorizeRoles("admin"), deleteClassRoutine);



export default router;
