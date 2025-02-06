"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      // Một giáo viên có thể dạy nhiều khóa học
      Teacher.hasMany(models.Course, { foreignKey: "teacherId" });
    }
  }

  Teacher.init(
    {
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
      experienceYears: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Mặc định là 0 năm kinh nghiệm
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Mặc định là ngày hiện tại
      },
    },
    {
      sequelize,
      modelName: "Teacher",
      tableName: "Teachers",
    }
  );

  return Teacher;
};
