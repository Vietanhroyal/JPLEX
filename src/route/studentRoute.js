// src/routes/studentRoute.js
import express from "express";
import studentController from "../controllers/studentController";

const router = express.Router();

// Hàm khởi tạo route
const initStudentRoutes = (app) => {
  // Ví dụ: CRUD cho student
  router.get("/api/students", studentController); // Lấy tất cả students
  router.post("/api/students", createStudent); // Tạo student
  router.get("/api/students/:id", getStudent); // Lấy 1 student
  router.put("/api/students/:id", updateStudent); // Sửa student
  router.delete("/api/students/:id", deleteStudent); // Xoá student

  // Gắn router vào app
  // Ở đây, ta dùng "/" làm base;
  // => endpoint thực tế: "/api/students", "/api/students/:id"
  return app.use("/", router);
};

export default initStudentRoutes