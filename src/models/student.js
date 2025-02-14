"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Student extends Model {
    static associate(models) {
      // Một sinh viên có thể học nhiều khóa học (Nhiều-Nhiều với Course)
      Student.belongsToMany(models.Course, {
        through: models.Enrollment, // Dùng model Enrollment làm bảng trung gian
        foreignKey: "studentId",
        otherKey: "courseId",
      });
    }
  }

  Student.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,

        defaultValue: () => Math.floor(10000000 + Math.random() * 90000000), // Sinh số ngẫu nhiên 8 chữ số
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s]*$/, // Chỉ cho phép chữ cái và khoảng trắng
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Yêu cầu nhập mật khẩu
        validate: {
          len: [8, 100], // Độ dài tối thiểu 8 ký tự
          isStrongPassword(value) {
            if (
              !/[A-Z]/.test(value) ||
              !/[a-z]/.test(value) ||
              !/[0-9]/.test(value)
            ) {
              throw new Error(
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
              );
            }
          },
        },
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toDateString(), // Ngày sinh phải trước ngày hiện tại
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 15],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      japaneseLevel: {
        type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"),
        allowNull: false,
      },
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Tự động lấy thời gian hiện tại khi nhập học
      },
    },
    {
      sequelize,
      modelName: "Student",
      tableName: "Students",
    }
  );

  return Student;
};
