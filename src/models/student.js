"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // Một sinh viên có thể học nhiều khóa học (Nhiều-Nhiều với Course)
      Student.belongsToMany(models.Course, {
        through: models.Enrollment,
        foreignKey: "studentId",
      });
    }
  }

  Student.init(
    {
      studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Kiểm tra email hợp lệ
        },
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true, // Chỉ chứa số
          len: [10, 15], // Độ dài từ 10 đến 15 số
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
        defaultValue: DataTypes.NOW, // Mặc định là ngày hiện tại
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
