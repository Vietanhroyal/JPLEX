// studentController.js (CommonJS)
const studentService = require("../services/studentService");

// Lấy tất cả Student
const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
   
    return res.render("getAllStudent.ejs", { data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Tạo Student
const createStudent = async (req, res) => {
  try {
    let result = await studentService.createStudent(req.body);
    if (
      result &&
      result.success === false &&
      result.errorType === "Validation Error"
    ) {
      return res.status(400).json({
        message: "Validation Error",
        errors: result.errors,
      });
    }

    return res.status(201).json({
      message: "Student created successfully",
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Lấy Student theo id
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Success",
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Cập nhật Student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      studentId,
      name,
      email,
      gender,
      birthdate,
      phoneNumber,
      address,
      japaneseLevel,
    } = req.body;

    const updated = await studentService.updateStudent(id, {
      studentId,
      name,
      email,
      gender,
      birthdate,
      phoneNumber,
      address,
      japaneseLevel,
    });

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Student updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Xoá Student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await studentService.deleteStudent(id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

let getcrud = (req, res) => {
  return res.render("test.ejs");
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getcrud,
};
