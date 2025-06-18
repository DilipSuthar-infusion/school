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
    const records = attendanceRecords.map((rec) => ({
      ...rec,
      classId,
      date,
      markedBy:req.user.id,
    }));
    const newRecords = await Attendance.bulkCreate(records, { ignoreDuplicates: true });
    res.status(201).json({ message: 'Bulk attendance marked', data: newRecords });
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



export const getYearlyStudentAttendance = async (req, res) => {
  const { studentId, year } = req.params;
  const loggedInUser = req.user;
  if (loggedInUser.role === "student" && loggedInUser.id !== studentId) {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }

  try {
    const attendance = await Attendance.findAll({
      where: {
        studentId,
        date: {
          [Op.between]: [
            new Date(year, 0, 1),
            new Date(year, 11, 31),
          ]
        }
      },
      order: [['date', 'ASC']],
    });

    res.status(200).json(attendance);
  } catch (err) {
    console.error("Error fetching yearly attendance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const attendance = await Attendance.findByPk(id);
    if (!attendance) throw new CustomError('Attendance record not found', 404);
    await attendance.update(updatedData);
    res.status(200).json({ message: 'Attendance updated successfully', data: attendance });
};

// DELETE attendance for a class in a specific year
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

