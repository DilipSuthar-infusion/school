import express from 'express';

const router = express.Router();

import { createStudyMaterial, deleteStudyMaterialById, getStudyMaterials } from '../controllers/studyMeterialController.js';
import upload from '../middleware/upload.js'; // Adjust the path as needed
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';


router.post('/', authenticate,authorizeRoles("teacher"), upload.single('file'), wrapAsync(createStudyMaterial));
router.delete('/:id',authenticate,authorizeRoles("teacher"), wrapAsync(deleteStudyMaterialById));
router.get('/',authenticate,authorizeRoles("student","teacher","parent","admin"), wrapAsync(getStudyMaterials));


export default router;