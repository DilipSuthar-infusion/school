import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
  const ExamResult = sequelize.define('ExamResult', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    marksObtained: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    remarks: DataTypes.TEXT,

    // Grade info merged here
    grade: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    gradePoint: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
    gradeDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Foreign keys
    examId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'ExamResults',
  });

 
export default ExamResult;