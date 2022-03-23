import { DataTypes, Model, Sequelize } from "sequelize";

export default class Ticket extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        tickets_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        ticket_id_user: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "user_id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        ticket_id_event: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "events",
            key: "events_id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
      },
      { sequelize }
    );

    return this;
  }
}
