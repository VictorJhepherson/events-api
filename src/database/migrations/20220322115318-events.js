"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      events_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      events_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      events_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      events_description: {
        type: Sequelize.STRING,
      },
      events_street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      events_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      events_neighborhood: {
        type: Sequelize.STRING,
      },
      events_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      events_state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      events_tickets_available: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      events_ticket_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      events_id_companies: {
        type: Sequelize.INTEGER,
        references: {
          model: "companies",
          key: "companies_id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("events");
  },
};
