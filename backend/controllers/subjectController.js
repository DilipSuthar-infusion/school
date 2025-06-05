

import Subject from "../models/subject.model.js"; // adjust path as needed

export const createSubject = async (req, res) => {
    const { name, subjectCode, description } = req.body;
    const existing = await Subject.findOne({ where: { subjectCode } });
    if (existing) {
      throw new Error("Subject already exists", 400);
    }
    const subject = await Subject.create({ name, subjectCode, description });
    await subject.save();
    res.status(201).json({ message: "Subject created successfully", subject });

};
export const getAllSubjects = async (req, res) => {
    const subjects = await Subject.findAll();
    if (!subjects) {
      throw new Error("No subjects found", 404);
    }
    res.status(200).json(subjects);
};

export const getSubjectById = async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    if (!subject) {
      throw new Error("Subject not found", 404);
    }
    res.status(200).json(subject);
};

export const deleteSubject = async (req, res) => {
    const { id } = req.params;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      throw new Error("Subject not found", 404);
    }
    await subject.destroy();
    res.status(200).json({ message: "Subject deleted successfully" });
};