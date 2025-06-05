import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      invoiceId: {
        type: DataTypes.UUID,
       
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM("cash", "creditCard", "bankTransfer"),
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "payments",
    },
  )

 

export default Payment;