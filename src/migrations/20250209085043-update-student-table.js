"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cập nhật cột studentId thành INTEGER 8 chữ số
    await queryInterface.changeColumn("Students", "studentId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });

    // Thêm cột password với giá trị mặc định để tránh lỗi
    await queryInterface.addColumn("Students", "password", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "defaultpassword", // 👈 Thêm giá trị mặc định để tránh lỗi
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Hoàn tác nếu rollback
    await queryInterface.changeColumn("Students", "studentId", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.removeColumn("Students", "password");
  },
};
