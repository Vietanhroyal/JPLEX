// src/services/studentService.js
const db = require("../models"); // Import models
const { Student } = db; // Lấy model Student từ db
const bcrypt = require("bcrypt");

const salt = bcrypt.genSalt(10);

// Lấy tất cả Student
const getAllStudents = async () => {
  return await Student.findAll();
};

// Tạo mới Student
const createStudent = async (data) => {
  try {
    if (!data.password || typeof data.password !== "string") {
      throw new Error("Password is required and must be a string");
    }

    let hashPassword = await hashStudentPassword(data.password);
    console.log("Received data in service:", hashPassword);
    const student = await Student.create({
      name: data.name, 
      email: data.email,
      password: hashPassword,
      gender: data.gender,
      birthdate: data.birthdate,
      phoneNumber: data.phoneNumber,
      address: data.address,
      japaneseLevel: data.japaneseLevel,
    });

    return student;
  } catch (error) {
    console.error("Error in createStudent:", error);
    throw error;
  }
};

const hashStudentPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("Hashed password:", hashedPassword); // 👈 Kiểm tra password sau khi hash

  return hashedPassword;
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
