"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {}

  Enrollment.init(
    {
      studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Students",
          key: "studentId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Courses",
          key: "courseId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Enrollment",
      tableName: "Enrollments",
      timestamps: false, // Bỏ timestamps nếu không cần createdAt và updatedAt
    }
  );

  return Enrollment;
};
