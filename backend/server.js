import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoute.js';
import feeRoutes from './routes/feeRoutes.js';
import feeStructureRoutes from './routes/feeStructure.routes.js';
import classRoutes from './routes/classRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import classRoutineRoutes from './routes/classRoutineRoutes.js';
import paymentRoute from './routes/payment.js';
import invoiceRoute from './routes/invoice.js';
import studyMaterialRoute from './routes/studyMeterial.js';
import attendanceRoutes from './routes/attendance.js';
import eventRoutes from './routes/eventRoute.js';
import examRoutes from './routes/examRoutes.js';
import examResultRoutes from './routes/examResultRoutes.js';


import {errorHandler} from './middleware/errorHandler.js';
import { associateModels } from './models/index.js';
// import User from './models/user.model.js';
// import { hash } from 'bcryptjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Error handler middleware
app.use(errorHandler);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/fee-structures', feeStructureRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/class-routines', classRoutineRoutes);
app.use('/api/payment', paymentRoute);
app.use('/api/invoice', invoiceRoute);
app.use('/api/study-materials', studyMaterialRoute);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/exam-results', examResultRoutes);

// const createAdminUser = async () => {
//   try {
//     const existingAdmin = await User.findOne({ where: { role: 'admin' } });
//     if (existingAdmin) {
//       console.log('Admin user already exists');
//       return;
//     }

//     const hashedPassword = await hash("admin123", 10);
//     await User.create({
//       username: 'Admin',
//       email: "admin@school.com",
//       password: hashedPassword,
//       role: 'admin',
//       profilePicture: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
//     });

//     console.log('Admin user created successfully');
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//   }
// }

// createAdminUser();
// import cron from 'node-cron';

// cron.schedule('* * * * *', () => {
//   console.log('Running a task every minute');
// });

app.get('/', (req, res) => {
  console.log(req.url, req.method, req.headers);
});


// Sync DB and start server
sequelize.sync({ force: false }).then(() => {
  associateModels();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});

