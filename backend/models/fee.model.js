import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
  const Fee = sequelize.define('Fee', {
     id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  feeType: { type: DataTypes.STRING, allowNull: false },
  studentId: { type: DataTypes.UUID, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('paid', 'unpaid', 'partial'), defaultValue: 'unpaid' },
  invoiced: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    timestamps: true,
    tableName: 'fees'
  });

 

export default Fee;