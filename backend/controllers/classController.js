import { where } from 'sequelize';
import Class  from '../models/class.model.js';
import User from '../models/user.model.js';
import CustomError from '../utils/customError.js';


export const createClass = async (req, res) => {
    const { name, section, roomNumber } = req.body;
    if (!name || !section ) {
      throw new CustomError('Missing required fields', 400);
    }
    const existingClass = await Class.findOne({ where: { name, section } });
    if (existingClass) {
      throw new CustomError('Class with this name and section already exists', 400);
    }
    const newClass = await Class.create({
      name,
      section,
      roomNumber,
    });
    return res.status(201).json({ message: 'Class created successfully', newClass });
};

export const getAllClasses = async (req, res) => {
    const classes = await Class.findAll();
    if (!classes) {
      throw new CustomError('No classes found', 404);
    }
    return res.status(200).json(classes);
};

export const getClassById = async (req, res) => {
    const { id } = req.params;
    const classObj = await Class.findByPk(id);
    if (!classObj) {
      throw new CustomError('Class not found', 404);
    }
    return res.status(200).json(classObj);
};


export const updateClass = async (req, res) => {
    const { id } = req.params;
    const {  name, section, roomNumber } = req.body;
    if (!name || !section ) {
      throw new CustomError('Missing required fields', 400);
    }
    const classObj = await Class.findByPk(id);
    if (!classObj) {
      throw new CustomError('Class not found', 404);
    }
    await classObj.update({
      name,
      section,
      roomNumber,
    });
    return res.status(200).json({ message: 'Class updated successfully', classObj });
  }
 


export const assignClassTeacher = async (req, res) => {

    const { classId, teacherId } = req.body;
    if(!classId || !teacherId){
      throw new CustomError('Missing required fields', 400);
    }
    const existingClass = await Class.findAll({where :{ teacherId: teacherId}});
    if(existingClass){
      throw new CustomError('Teacher already assigned to a class', 400);
    }
    const classObj = await Class.findByPk(classId);
    if (!classObj) {
      throw new CustomError('Class not found', 404);
    }
    const teacherObj = await User.findByPk(teacherId);
    if (!teacherObj) {
      throw new CustomError('Teacher not found', 404);
    }
    classObj.teacherId = teacherId;
    await classObj.save();
    res.status(200).json({
      message: "Class teacher assigned successfully",
      class: classObj
    });
};


export const deleteAssignedClassTeacher = async (req, res) => {
    const { classId } = req.body;
    const classObj = await Class.findByPk(classId);
    if (!classObj) {
      throw new CustomError('Class not found', 404);
    }
    classObj.teacherId = null;
    await classObj.save();
    res.status(200).json({ message: "Class teacher deleted successfully" });
};
