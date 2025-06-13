import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
  const Exam = sequelize.define('Exam', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    examName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },  
    examDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    examTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    
  }, {
    timestamps: true,
    tableName: 'Exams',
  });

 

export default Exam;
