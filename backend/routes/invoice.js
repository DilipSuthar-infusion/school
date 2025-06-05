// routes/invoiceRoutes.js
import express from 'express';
import { generateInvoice, getStudentInvoices, invoiceAll } from '../controllers/invoiceController.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';
import wrapAsync from '../utils/wrapAsync.js';


const router = express.Router();

router.post('/add/:studentId', authenticate,authorizeRoles('admin','teacher','parent','student'), wrapAsync(generateInvoice));
router.get('/',authenticate,authorizeRoles('admin','teacher','parent','student'), wrapAsync(invoiceAll));

router.get('/:studentId',authenticate,authorizeRoles('admin','teacher','parent','student'), wrapAsync(getStudentInvoices));

export default router;