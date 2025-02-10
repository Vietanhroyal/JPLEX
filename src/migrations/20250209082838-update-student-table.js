"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cập nhật cột studentId để tự động tạo UUID
    await queryInterface.changeColumn("Students", "studentId", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.UUIDV4, // Tự động tạo UUID cho studentId nếu chưa có
    });

    // Cập nhật cột enrollmentDate để tự động lấy thời gian hiện tại
    await queryInterface.changeColumn("Students", "enrollmentDate", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Tự động lấy thời gian hiện tại nếu chưa có giá trị
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Hoàn tác thay đổi nếu rollback migration
    await queryInterface.changeColumn("Students", "studentId", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn("Students", "enrollmentDate", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
