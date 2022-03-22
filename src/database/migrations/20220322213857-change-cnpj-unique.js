"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("companies", "companies_cnpj", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
