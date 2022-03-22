import { DataTypes, Model, Sequelize } from "sequelize";
//import Companies from "./companiesModel";
//import Ticket from "./ticketsModel";

export default class Event extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        events_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        events_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        events_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        events_description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        events_street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        events_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        events_neighborhood: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        events_city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        events_state: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        events_tickets_available: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        events_ticket_price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
      },
      { sequelize }
    );

    //this.hasMany(Ticket, { foreignKey: "ticket_id_event" });
    //this.belongsTo(Companies, { foreignKey: "companies_id" });

    return this;
  }
}
