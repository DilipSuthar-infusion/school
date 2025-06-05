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
  
  },
  parentId: {
    type: DataTypes.UUID,
   
  }


},
{
  timestamps: true,
  tableName: 'student_parents',
}
);

export default StudentParent;