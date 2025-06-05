import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StudentParent = sequelize.define('StudentParent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: false,
  }


},
{
  timestamps: true,
  tableName: 'student_parents',

);

export default StudentParent;