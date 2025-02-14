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
    console.error("Error caught:", error);

    if (error.name === "SequelizeValidationError") {
      return {
        success: false,
        errorType: "Validation Error",
        errors: error.errors.map((err) => err.message),
      };
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return {
        success: false,
        errorType: "Unique Constraint Error",
        errors: ["Email already exists"],
      };
    } else {
      return {
        success: false,
        errorType: "Unknown Error",
        errors: [error.message],
      };
    }
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
  try {
    const student = await Student.findByPk(id);
    if (!student) return null; // Trả về null nếu không tìm thấy student

    return await student.update(newData);
  } catch (error) {
    console.error("Error in updateStudent:", error);
    throw error;
  }
};

// Xoá Student
const deleteStudent = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) return null; // Trả về null nếu không tìm thấy student

    await student.destroy();
    return student; // Trả về bản ghi đã bị xoá
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    throw error;
  }
};

// Export tất cả các service
module.exports = {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
