import User from '../models/user.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import CustomError from '../utils/customError.js';
import StudentParent from '../models/StudentParent.model.js';
import { Op } from 'sequelize';


dotenv.config();


export const createUserWithRole = async (req, res) => {
  try {
    const { name, email, role, phone, address } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!['student', 'teacher', 'parent'].includes(role)) {
      throw new CustomError('Invalid role specified', 400);
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError('User already exists', 400);
    }

    const randomPassword = crypto.randomBytes(6).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const userData = {
      profilePicture: filePath || 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
    };

    if (role === 'student') {
      const { dateOfBirth, gender, bloodGroup, classId } = req.body;
      Object.assign(userData, {
        admissionNumber: `ADM-${Date.now()}`,
        dateOfBirth,
        gender,
        bloodGroup,
        classId,
      });
    } else if (role === 'teacher') {
      const { qualification, subjectsTaught, joiningDate, salary } = req.body;
      Object.assign(userData, {
        qualification,
        subjectsTaught,
        joiningDate,
        salary,
      });
    }

    const user = await User.create(userData);

    if (role === 'parent') {
      const { occupation, studentId, relationType } = req.body;

      if (!studentId) {
        throw new CustomError('Student ID is required to link parent', 400);
      }

      const student = await User.findOne({ where: { id: studentId, role: 'student' } });
      if (!student) {
        throw new CustomError('Student not found with the given ID', 404);
      }

      await user.update({ occupation, relationType });
      await StudentParent.create({
        parentId: user.id,
        studentId,
      });
    }

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully`,
      credentials: { email, password: randomPassword },
      user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Server Error' });
  }
};



export const updatePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      throw new CustomError('Email, old password, and new password are required', 400);
    }

    if (newPassword.length < 8) {
      throw new CustomError('New password must be at least 8 characters long', 400);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError('User not found', 404);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new CustomError('Old password is incorrect', 401);

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });

    res.status(200).json({ message: 'Password updated successfully' });

};



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: User,
          as: 'Parents',
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] },
        },
        {
          model: User,
          as: 'Students',
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const { name, email, role, phone, address } = req.body;

    // Common updates
    const updatedData = { name, email, role, phone, address };

    // Role-based fields
    if (role === "student") {
      const {
        dateOfBirth,
        gender,
        bloodGroup,
        admissionDate,
        classId,
        rollNumber,
      } = req.body;

      Object.assign(updatedData, {
        dateOfBirth,
        gender,
        bloodGroup,
        admissionDate,
        classId,
        rollNumber,
      });
    }

    if (role === "teacher") {
      const { qualification, subjectsTaught, joiningDate, salary } = req.body;

      Object.assign(updatedData, {
        qualification,
        subjectsTaught,
        joiningDate,
        salary,
      });
    }

    if (role === "parent") {
      const { occupation, studentId, relationType } = req.body;

      Object.assign(updatedData, {
        occupation,
        studentId,
        relationType,
      });
    }

    await user.update(updatedData);

    res.status(200).json({ message: "User updated successfully" });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong while updating user",
    });
  }
};



export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  if (user.role === 'student') {
    const parentLinks = await StudentParent.findAll({ where: { studentId: id } });
    const parentIds = parentLinks.map(link => link.parentId);

    await user.destroy(); // Delete student

    for (const parentId of parentIds) {
      const hasOtherChildren = await StudentParent.findOne({
        where: {
          parentId,
          studentId: { [Op.ne]: id },
        },
      });

      if (!hasOtherChildren) {
        await User.destroy({ where: { id: parentId } });
      }
    }
  } else {
    // If parent or teacher, simply delete
    await user.destroy();
  }

  res.status(200).json({ message: 'User deleted successfully' });
};
