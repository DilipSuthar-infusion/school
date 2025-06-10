
import Class from '../models/class.model.js';
import StudyMaterial from '../models/studymeterial.model.js'
import Subject from '../models/subject.model.js';
import User from '../models/user.model.js';

export const createStudyMaterial = async (req, res) => {
    const { title, description, classId, subjectId } = req.body;
    const filePath = req.file?.path || req.body.filePath;
    const user = req.user;
    if (!filePath) {
      throw new Error('No file path provided', 400);
    }
    if (!title || !description || !classId || !subjectId) {
     throw new Error('Missing required fields', 400);
    }
    const titleExists = await StudyMaterial.findOne({ where: { title, classId, subjectId } });
    if (titleExists) {
      throw new Error('Study material with this title already exists', 400);
    }
    const material = await StudyMaterial.create({
      title,
      description,
      filePath,
      classId,
      subjectId,
      teacherId: user.id
    });

    res.status(201).json({
      message: 'Study material uploaded successfully',
      data: material,
    });
};  

export const deleteStudyMaterialById = async (req, res) => {
    const { id } = req.params;
    const material = await StudyMaterial.findByPk(id);
    if (!material) {
      throw new Error('Study material not found', 404);
    }
    await material.destroy();
    res.status(200).json({ message: 'Study material deleted successfully' });
};


export const getStudyMaterials = async (req, res) => {
  const { classId, subjectId } = req.query;
  const whereClause = {};

  if (classId) {
    whereClause.classId = classId;
  }

  if (subjectId) {
    whereClause.subjectId = subjectId;
  }

  const materials = await StudyMaterial.findAll({
    where: whereClause,
    include: [
      {
        model: Class,
        as: 'class', // alias for StudyMaterial -> Class
        attributes: ['name'],
        include: [
          {
            model: User,
            as: 'classTeacher', // alias for Class -> User
            attributes: ['username'],
          },
        ],
      },
      {
        model: Subject,
        as: 'subject', // alias for StudyMaterial -> Subject
        attributes: ['name'],
      },
      {
        model: User,
        as: 'teacher', // alias for StudyMaterial -> User (uploader)
        attributes: ['username'],
      },
    ],
  });

  if (!materials || materials.length === 0) {
    return res.status(404).json({ message: 'No study materials found' });
  }

  res.status(200).json({ data: materials });
};
