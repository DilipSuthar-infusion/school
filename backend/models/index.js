import sequelize from '../config/database.js';

import Attendance from './attendence.model.js';
import Class from './class.model.js';
import ClassRoutine from './classroutine.model.js';
import Event from './event.model.js';
import ExamResult from './examResult.model.js';
import Exam from './exam.model.js';
import Fee from './fee.model.js';
import FeesStructure from './feeStructure.model.js';
import Invoice from './invoice.model.js';
import Payment from './payment.model.js';
import StudyMaterial from './studymeterial.model.js';
import Subject from './subject.model.js';
import User from './user.model.js';
import StudentParent from './StudentParent.model.js';

const models = {
  sequelize,
  Attendance,
  Class,
  ClassRoutine,
  Event,
  Exam,
  ExamResult,
  Fee,
  FeesStructure,
  Invoice,
  Payment,
  StudyMaterial,
  Subject,
  User,
};

const associateModels = () => {
 
  models.Attendance.belongsTo(models.User, { foreignKey: 'studentId', as: 'student' });
  models.Attendance.belongsTo(models.Class, { foreignKey: 'classId', as: 'class' });
  models.Attendance.belongsTo(models.User, { foreignKey: 'markedBy', as: 'marker' });
  models.User.hasMany(models.Attendance, { foreignKey: 'studentId', as: 'attendances', onDelete: 'CASCADE', hooks: true });
  

  models.Class.belongsTo(models.User, { foreignKey: 'teacherId', as: 'classTeacher' });
  models.Class.hasMany(models.User, { foreignKey: 'classId', as: 'students' });
  models.Class.hasMany(models.ClassRoutine, { foreignKey: 'classId', as: 'routines' });
  models.Class.hasMany(models.Exam, { foreignKey: 'classId', as: 'exams' });

  models.Exam.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
  models.Exam.belongsTo(models.Class, { foreignKey: 'classId', as: 'class' });
  models.Exam.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
  models.Exam.hasMany(models.ExamResult, { foreignKey: 'examId', onDelete: 'CASCADE', hooks: true });


  models.ExamResult.belongsTo(models.Exam, { foreignKey: 'examId', as: 'exam' });
  models.ExamResult.belongsTo(models.User, { foreignKey: 'studentId', as: 'student' });
  models.ExamResult.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });


  models.User.hasMany(models.Fee, { foreignKey: 'studentId', onDelete: 'CASCADE', hooks: true });
  models.Fee.belongsTo(models.User, { foreignKey: 'studentId' });

  
  models.Class.hasOne(models.FeesStructure, { foreignKey: 'classId' });
  models.FeesStructure.belongsTo(models.Class, { foreignKey: 'classId' });


  models.User.hasMany(models.Invoice, { foreignKey: 'studentId',as: 'invoices', onDelete: 'CASCADE', hooks: true });
  models.Invoice.belongsTo(models.User, { foreignKey: 'studentId', as:'student' });
 
  models.Invoice.hasMany(models.Payment, { foreignKey: 'invoiceId', onDelete: 'CASCADE', hooks: true });
  models.Payment.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });

  StudyMaterial.belongsTo(Class, { foreignKey: 'classId', as: 'class' });
  Class.hasMany(StudyMaterial, { foreignKey: 'classId', as: 'studyMaterials' });
  StudyMaterial.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
  StudyMaterial.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });
  User.hasMany(Event, { foreignKey: 'createdBy', as: 'createdEvents' });
  ClassRoutine.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });
  ClassRoutine.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
  ClassRoutine.belongsTo(Class, { foreignKey: 'classId', as: 'class' });
  User.belongsToMany(User, {
    as: 'Parents',
    through: StudentParent,
    foreignKey: 'studentId',
    otherKey: 'parentId',
    onDelete: 'CASCADE',
  });
  
  User.belongsToMany(User, {
    as: 'Students',
    through: StudentParent,
    foreignKey: 'parentId',
    otherKey: 'studentId',
  });

  Event.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
  
  
};

export { models, associateModels };
