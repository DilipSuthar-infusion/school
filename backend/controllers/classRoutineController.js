import { checkRoutineConflicts } from '../utils/checkRoutineConflicts.js';
import CustomError from '../utils/customError.js';
import Classes from '../models/class.model.js';
import ClassRoutine from '../models/classroutine.model.js';
import User from '../models/user.model.js';
import Subject from '../models/subject.model.js';
import Class from '../models/class.model.js';
export const createClassRoutine = async (req, res) => {
  try {
    const { classId, subjectId, teacherId, date, dayOfWeek, startTime, endTime } = req.body;

    if (!classId || !subjectId || !teacherId || !date || !dayOfWeek || !startTime || !endTime) {
      throw new CustomError('Missing required fields', 400);
    }

    if (startTime >= endTime) {
      throw new CustomError('Start time must be before end time', 400);
    }

    const classRoom = await Classes.findByPk(classId);
    if (!classRoom) {
      throw new CustomError('Class not found', 404);
    }

    await checkRoutineConflicts({ classId, teacherId, date, dayOfWeek, startTime, endTime });

    const newRoutine = await ClassRoutine.create({
      classId,
      subjectId,
      teacherId,
      date,
      dayOfWeek,
      startTime,
      endTime,
      roomNumber: classRoom.roomNumber,
    });

    res.status(201).json({ message: 'Class routine created successfully', data: newRoutine });

  } catch (error) {
    
      throw new CustomError('Class routine already exists for this day and date', 400);
   
  }
};




export const updateClassRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { classId, subjectId, teacherId, dayOfWeek, date, startTime, endTime } = req.body;

    if (!classId || !subjectId || !teacherId || !date || !dayOfWeek || !startTime || !endTime) {
      throw new CustomError('Missing required fields', 400);
    }

    if (startTime >= endTime) {
      throw new CustomError('Start time must be before end time', 400);
    }

    const routine = await ClassRoutine.findByPk(id);
    if (!routine) {
      throw new CustomError('Class routine not found', 404);
    }

    const classRoom = await Classes.findByPk(classId);
    if (!classRoom) {
      throw new CustomError('Class not found', 404);
    }

    await checkRoutineConflicts({ classId, teacherId, date, dayOfWeek, startTime, endTime, excludeId: id });

    await routine.update({
      classId,
      subjectId,
      teacherId,
      dayOfWeek,
      date,
      startTime,
      endTime,
      roomNumber: classRoom.roomNumber,
    });

    res.status(200).json({ message: "Class routine updated successfully", data: routine });

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};


export const deleteClassRoutine = async (req, res) => {
  try {
    const { id } = req.params;

    const routine = await ClassRoutine.findByPk(id);

    if (!routine) {
      throw new CustomError('Class routine not found', 404);
    }

    await routine.destroy();

    res.status(200).json({
      message: 'Class routine deleted successfully',
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};


export const getClassRoutinesByDate  = async (req, res) => {
  try {
    const { classId, date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'date is required' });
    }
    const records = await ClassRoutine.findAll({
      where: { classId, date },
      include: [{ model: User, as: 'student', attributes: ['id', 'username'] }]
    });

    res.status(200).json({ data: records });
  } catch (error) { 
    res.status(500).json({ message: 'Error fetching class routines', error: error.message });
  }
};



export const getAllClassRoutines = async (req, res) => {
  try {
    const routines = await ClassRoutine.findAll({
      include: [
        {
          model: User,
          as: 'teacher',
          attributes: ['id', 'username'],
        },
        {
          model: Class,
          as: 'class',
          attributes: ['id', 'name'],
        },
        {
          model: Subject,
          as: 'subject',
          attributes: ['id', 'name'],
        },
      ],
    });
    
    res.status(200).json(routines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};  