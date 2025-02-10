"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Một khóa học có thể có nhiều sinh viên (Nhiều-Nhiều với Student)
      Course.belongsToMany(models.Student, {
        through: models.Enrollment, // Dùng model Enrollment làm bảng trung gian
        foreignKey: "courseId",
        otherKey: "studentId",
      });
    }
  }

  Course.init(
    {
      courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      courseName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Teachers",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      level: {
        type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "Courses",
    }
  );

  return Course;
};
