// src/routes/studentRoute.js
import express from "express";
import studentController from "../controllers/studentController";

const router = express.Router();

// Hàm khởi tạo route
const initStudentRoutes = (app) => {
  // Ví dụ: CRUD cho student
  router.get("/api/crudstudents", studentController.getcrud); // Lấy tất cả students
  router.delete("/api/deletestudent/:id", studentController.deleteStudent); // xóa student
  router.get("/api/getallstudents", studentController.getAllStudents); // Lấy tất cả students
  router.post("/api/createstudents", studentController.createStudent); // Tạo student
  router.put("/api/upadatestudents/:id", studentController.updateStudent); // Cập nhật student
  router.get("/api/editstudent/:id", studentController.getEditStudent); // form edit student

  // Gắn router vào app
  // Ở đây, ta dùng "/" làm base;
  // => endpoint thực tế: "/api/students", "/api/students/:id"
  return app.use("/", router);
};

export default initStudentRoutes;
