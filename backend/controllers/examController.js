import Exam from "../models/exam.model.js"; 
import Subject from "../models/subject.model.js"; 
import Class from "../models/class.model.js"; 
import User from "../models/user.model.js"; 
import CustomError from "../utils/customError.js";
export const createExam = async (req, res) => {
  try {
    const {
      examName,
      examDate,
      examTime,
      classId,
      subjectId,
    } = req.body;

  
    if (
      !examName ||
      !examDate ||
      !examTime ||
      !classId ||
      !subjectId
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingExam = await Exam.findOne({ where: { examName, classId, subjectId } });
    if (existingExam) {
      throw new CustomError('Exam with this name already exists', 400);
    }
    


    const classExists = await Class.findByPk(classId);
    if (!classExists) {
      return res.status(404).json({ error: 'Class not found' });
    }


    const subjectExists = await Subject.findByPk(subjectId);
    if (!subjectExists) {
      return res.status(404).json({ error: 'Subject not found' });
    }


   

    const newExam = await Exam.create({
      examName,
      examDate,
      examTime,
      classId,
      subjectId
    });

    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllExams = async (req, res) => {
 
    const exams = await Exam.findAll({
      include: [ 'class', 'subject'],
      order: [['examDate', 'ASC']],
    });
    res.json(exams);
 
};


export const getExamById = async (req, res) => {
 
    const { id } = req.params;
    const exam = await Exam.findByPk(id, {
      include: ['creator', 'class', 'subject'],
    });
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json(exam);
};

export const updateExam = async (req, res) => {
    const { id } = req.params;
    const exam = await Exam.findByPk(id);
    if (!exam) throw new CustomError('Exam not found', 404);

    await exam.update(req.body);
    res.json(exam);
};

export const deleteExam = async (req, res) => {
    const { id } = req.params;
    const exam = await Exam.findByPk(id);
    if (!exam) throw new Error('Exam not found', 404);

    await exam.destroy();
    res.json({ message: 'Exam deleted successfully' });
};


export const getExamsByClassId = async (req, res) => {
    const { classId } = req.params;

    const exams = await Exam.findAll({
      where: { classId },
      include: [
        {
          model: Subject,
          as: 'subject', // Match this with the alias used in your association
          attributes: ['id', 'name'],
        },
      ],
      order: [['examDate', 'ASC']],
    });

    res.json(exams);
};
