import { Op } from 'sequelize';
import Attendance from '../models/attendence.model.js';
import Class from '../models/class.model.js';
import User from '../models/user.model.js';
import CustomError from '../utils/customError.js';

export const createAttendance = async (req, res) => {
    const { studentId, classId, date, status, markedBy } = req.body;
    const existing = await Attendance.findOne({
      where: { studentId, classId, date }
    });
    if (existing) {
      throw new CustomError('Attendance already exists', 400);
    }
    const newAttendance = await Attendance.create({ studentId, classId, date, status, markedBy });
    res.status(201).json({ message: 'Attendance marked successfully', data: newAttendance });
  
};
export const markBulkAttendance = async (req, res) => {
  const { classId, date, attendanceRecords } = req.body;
  const markedBy = req.user.id;

  try {
    const existingRecords = await Attendance.findAll({
      where: {
        classId,
        date,
        studentId: attendanceRecords.map((r) => r.studentId),
      },
    });

    const existingStudentIds = new Set(existingRecords.map((r) => r.studentId));

    const newRecords = attendanceRecords
      .filter((r) => !existingStudentIds.has(r.studentId))
      .map((r) => ({
        ...r,
        classId,
        date,
        markedBy,
      }));

    const inserted = await Attendance.bulkCreate(newRecords);

    if (existingRecords.length > 0 && inserted.length === 0) {
      return res.status(200).json({
        message: 'Attendance already exists for all selected students on this date.',
        existing: existingRecords,
        inserted: [],
      });
    } else if (existingRecords.length > 0 && inserted.length > 0) {
      return res.status(200).json({
        message: 'Partial attendance marked. Some records already existed.',
        existing: existingRecords,
        inserted,
      });
    } else {
      return res.status(201).json({
        message: 'Bulk attendance marked successfully.',
        inserted,
      });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to mark bulk attendance',
      error: err.message || err,
    });
  }
};





export const getMonthlyAttendance = async (req, res) => {
  const { classId, month, year } = req.query;
  const records = await Attendance.findAll({
    where: {
      classId,
      date: {
        [Op.between]: [
          `${year}-${month}-01`,
          `${year}-${month}-31`,
        ],
      },
    },
  });
  res.json(records);
};




export const getClassAttendanceByDate = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'date is required' });
    }
    const records = await Attendance.findAll({
      where: { classId, date },
      include: [{ model: User, as: 'student', attributes: ['id', 'name'] }]
    });

    res.status(200).json({ data: records });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class attendance', error: error.message });
  }
};
  



export const getAllAttendance = async (req, res) => {
    const attendanceList = await Attendance.findAll({
      include: [
        { model: User, as: 'student', attributes: ['id', 'username'] },
        { model: User, as: 'marker', attributes: ['id', 'username'] },
        { model: Class, as: 'class', attributes: ['id', 'classname'] }
      ],
     
    });
    res.status(200).json(attendanceList);
};






export const deleteYearlyAttendance = async (req, res) => {
  const { classId, year } = req.params;

  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${parseInt(year) + 1}-01-01`);

    const deletedCount = await Attendance.destroy({
      where: {
        classId,
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate
        }
      }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "No attendance records found for the specified year and class." });
    }

    res.status(200).json({
      message: `Deleted ${deletedCount} attendance records for class ${classId} in year ${year}.`,
    });
  } catch (error) {
    console.error("Delete Yearly Attendance Error:", error);
    res.status(500).json({ message: "Failed to delete attendance records." });
  }
}; 
