// src/services/studentService.js
const db = require("../models"); // Import models
const { Student } = db; // Lấy model Student từ db

// Lấy tất cả Student
const getAllStudents = async () => {
  return await Student.findAll();
};

// Tạo mới Student
const createStudent = async (studentData) => {
  return await Student.create(studentData);
};

// Lấy Student theo ID
const getStudentById = async (id) => {
  return await Student.findByPk(id);
};

// Cập nhật Student
const updateStudent = async (id, newData) => {
  const student = await Student.findByPk(id);
  if (!student) return null; // Trả về null nếu không tìm thấy student

  return await student.update(newData);
};

// Xoá Student
const deleteStudent = async (id) => {
  const student = await Student.findByPk(id);
  if (!student) return null; // Trả về null nếu không tìm thấy student

  await student.destroy();
  return student; // Trả về bản ghi đã bị xoá
};

// Export tất cả các service
module.exports = {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
