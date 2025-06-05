import Attendance from '../models/attendence.model.js';
import Class from '../models/class.model.js';
import User from '../models/user.model.js';
import CustomError from '../utils/customError.js';

export const createAttendance = async (req, res) => {
    const { studentId, classId, date, status, remarks, markedBy } = req.body;
    const existing = await Attendance.findOne({
      where: { studentId, classId, date }
    });
    if (existing) {
      throw new CustomError('Attendance already exists', 400);
    }
    const newAttendance = await Attendance.create({ studentId, classId, date, status, remarks, markedBy });
    res.status(201).json({ message: 'Attendance marked successfully', data: newAttendance });
  
};

export const markBulkAttendance = async (req, res) => {
    const { classId, date, markedBy, attendanceRecords } = req.body;
    const records = attendanceRecords.map((rec) => ({
      ...rec,
      classId,
      date,
      markedBy,
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
        { model: User, as: 'student', attributes: ['id', 'name'] },
        { model: Class, as: 'class' },
        { model: User, as: 'marker', attributes: ['id', 'name'] }
      ],
    });
    res.status(200).json(attendanceList);
};



export const getStudentAttendance = async (req, res) => {
    const { studentId } = req.params;
    const records = await Attendance.findAll({
      where: { studentId },
      include: [{ model: Class, as: 'class' },
        { model: User, as: 'student', attributes: ['name'] }
      ],
      order: [['date', 'DESC']],
    });
    res.status(200).json(records);
};



export const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const attendance = await Attendance.findByPk(id);
    if (!attendance) throw new CustomError('Attendance record not found', 404);
    await attendance.update(updatedData);
    res.status(200).json({ message: 'Attendance updated successfully', data: attendance });
};

export const deleteAttendance = async (req, res) => {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id);
    if (!attendance) throw new CustomError('Attendance record not found', 404);
    await attendance.destroy();
    res.status(200).json({ message: 'Attendance record deleted successfully' });
};
