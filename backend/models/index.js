import sequelize from '../config/database.js';
import Attendance from './attendence.model.js';
import Class from './class.model.js';
import ClassRoutine from './classroutine.model.js';
import Event from './event.model.js';
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
  Fee,
  FeesStructure,
  Invoice,
  Payment,
  StudyMaterial,
  Subject,
  User,
};

const associateModels = () => {
 
  models.Attendance.belongsTo(User, { as: 'student', foreignKey: 'studentId' });
  models.Attendance.belongsTo(User, { as: 'marker', foreignKey: 'markedBy' });
  models.Attendance.belongsTo(Class, { as: 'class', foreignKey: 'classId' });

  models.User.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendances' });
  models.User.hasMany(Attendance, { foreignKey: 'markedBy', as: 'markedAttendances' });
  models.Class.hasMany(Attendance, { foreignKey: 'classId', as: 'attendances' });
  models.Class.belongsTo(models.User, { foreignKey: 'teacherId', as: 'classTeacher' });
  models.Class.hasMany(models.User, { foreignKey: 'classId', as: 'students' });
  models.Class.hasMany(models.ClassRoutine, { foreignKey: 'classId', as: 'routines' });
 
 


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
