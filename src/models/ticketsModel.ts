import { DataTypes, Model, Sequelize } from "sequelize";
//import Event from "./eventsModel";
//import User from "./usersModel";

export default class Ticket extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        ticket_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        ticket_purchase_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      { sequelize }
    );

    //this.belongsTo(User, { foreignKey: "user_id" });
    //this.belongsTo(Event, { foreignKey: "events_id" });

    return this;
  }
}
