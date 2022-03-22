"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "user_cpf", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
