// controllers/feeController.js
import Fee from '../models/fee.model.js';
import FeesStructure from '../models/feeStructure.model.js';
import Student from '../models/user.model.js';
export const assignFeeToStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findByPk(studentId);
    if (!student) throw new CustomError('Student not found', 404);

    const existingFees = await Fee.findAll({ where: { studentId } });
    if (existingFees.length > 0) {
      throw new CustomError('Fees already assigned to this student', 400);
    }

    const structures = await FeesStructure.findAll({ where: { classId: student.classId } });
    if (structures.length === 0) {
      throw new CustomError('No fee structures found for this class', 404);
    }

    const today = new Date();

    const fees = structures.map(struct => ({
      feeType: struct.feeType,
      studentId,
      amount: struct.amount,
      dueDate: new Date(today.getFullYear(), today.getMonth() + 1, 5),
      status: 'unpaid',
    }));

    await Fee.bulkCreate(fees);

    res.status(201).json({ message: 'Fees assigned successfully', assignedCount: fees.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getStudentFees = async (req, res) => {
  try {
    const { studentId } = req.params;
    const fees = await Fee.findAll({ where: { studentId } });

    const totalDue = fees
      .filter(fee => fee.status !== 'paid')
      .reduce((sum, fee) => sum + fee.amount, 0);

    const totalPaid = fees
      .filter(fee => fee.status === 'paid')
      .reduce((sum, fee) => sum + fee.amount, 0);

    res.json({
      totalPaid,
      totalDue,
      totalFees: fees.length,
      fees,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
