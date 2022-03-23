"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      companies_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      companies_name_responsable: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companies_cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companies_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companies_mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      companies_name_corporate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("companies");
  },
};
