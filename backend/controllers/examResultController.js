import  ExamResult  from '../models/examResult.model.js';
import  Exam  from '../models/exam.model.js';
import  User  from '../models/user.model.js';
import Subject from '../models/subject.model.js';
import CustomError from '../utils/customError.js';


function calculateGrade(marks) {
  if (marks >= 90) return { grade: 'A+', gradePoint: 4.0, gradeDescription: 'Excellent' };
  if (marks >= 80) return { grade: 'A', gradePoint: 3.7, gradeDescription: 'Very Good' };
  if (marks >= 70) return { grade: 'B', gradePoint: 3.0, gradeDescription: 'Good' };
  if (marks >= 60) return { grade: 'C', gradePoint: 2.0, gradeDescription: 'Average' };
  if (marks >= 50) return { grade: 'D', gradePoint: 1.0, gradeDescription: 'Below Average' };
  return { grade: 'F', gradePoint: 0.0, gradeDescription: 'Fail' };
}

export const createResult = async (req, res) => {
    const { examId, studentId, subjectId, marksObtained, remarks } = req.body;
    const existing = await ExamResult.findOne({ where: { studentId, examId, subjectId } });
    if (existing) {
      throw new CustomError('Result already exists', 400);
    }
    const gradeInfo = calculateGrade(Number(marksObtained));

    const newResult = await ExamResult.create({
      examId,
      studentId,
      subjectId,
      marksObtained,
      remarks,
      grade: gradeInfo.grade,
      gradePoint: gradeInfo.gradePoint,
      gradeDescription: gradeInfo.gradeDescription,
    });

    res.status(201).json({ message: 'Result created successfully', data: newResult });
};

export const updateResult = async (req, res) => {
    const { id } = req.params;
    const { marksObtained, remarks } = req.body;

    const result = await ExamResult.findByPk(id);
    if (!result) throw new CustomError('Result not found', 404);

    let gradeUpdate = {};
    if (marksObtained !== undefined) {
      const gradeInfo = calculateGrade(Number(marksObtained));
      gradeUpdate = {
        grade: gradeInfo.grade,
        gradePoint: gradeInfo.gradePoint,
        gradeDescription: gradeInfo.gradeDescription,
      };
    }

    await result.update({
      marksObtained,
      remarks,
      ...gradeUpdate,
    });

    res.status(200).json({ message: 'Result updated successfully', data: result });
};

export const getResultById = async (req, res) => {
    const { id } = req.params;
    const result = await ExamResult.findByPk(id, {
      include: [
        { model: Exam, as: 'exam' },
        { model: User, as: 'student' },
        { model: Subject, as: 'subject' },
      ],
    });

    if (!result) return res.status(404).json({ message: 'Result not found' });

    res.status(200).json(result);
};

export const getAllResults = async (req, res) => {
    const { studentId, examId, subjectId } = req.query;
    const whereClause = {};
    if (studentId) whereClause.studentId = studentId;
    if (examId) whereClause.examId = examId;
    if (subjectId) whereClause.subjectId = subjectId;

    const results = await ExamResult.findAll({
      where: whereClause,
      include: [
        { model: Exam, as: 'exam' },
        { model: User, as: 'student' },
        { model: Subject, as: 'subject' },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(results);
 
};

export const deleteResult = async (req, res) => {
 
    const { id } = req.params;
    const result = await ExamResult.findByPk(id);

    if (!result) throw new Error('Result not found', 404);

    await result.destroy();
    res.status(200).json({ message: 'Result deleted successfully' });
 
};


export const getResultsByStudentId = async (req, res) => {

    const user_id = req.user.id; // Assuming user ID is available in req.user

    const results = await ExamResult.findAll({
      where: { studentId: user_id },
      include: ['exam', 'subject'], // include related exam and subject info if needed
      order: [['createdAt', 'DESC']],
    });

    if (!results.length) {
      throw new Error('No results found', 404);
    }

    res.status(200).json(results);
};