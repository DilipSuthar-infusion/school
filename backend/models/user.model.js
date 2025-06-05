// models/User.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
   
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher', 'student', 'parent'),
    allowNull: true,
    defaultValue: 'student',
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
 
  
  // Student-specific
  admissionNumber: { type: DataTypes.STRING },
  classId: { type: DataTypes.UUID },
  dateOfBirth: { type: DataTypes.DATE },
  gender: { type: DataTypes.STRING },
  bloodGroup: { type: DataTypes.STRING },
  // Teacher-specific
  qualification: { type: DataTypes.STRING },
  subjectsTaught: { type: DataTypes.STRING },
  joiningDate: { type: DataTypes.DATE },
  salary: { type: DataTypes.FLOAT },

  // Parent-specific
  occupation: { type: DataTypes.STRING },
  studentId: { type: DataTypes.UUID },     
  relationType: { type: DataTypes.STRING }, 

}, {
  timestamps: true,
  tableName: 'users',
});

export default User;
