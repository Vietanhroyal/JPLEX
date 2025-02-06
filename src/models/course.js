"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  );
  return Course;
};
