import { DataTypes, Model, Sequelize } from "sequelize";
import Companies from "./companiesModel";
import Ticket from "./ticketsModel";

export default class Event extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        events_name: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        events_date: {
          type: DataTypes.DATE,
          defaultValue: "",
        },
        events_description: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        events_street: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        events_number: {
          type: DataTypes.INTEGER,
          defaultValue: "",
        },
        events_neighborhood: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        events_city: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        events_state: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        events_tickets_available: {
          type: DataTypes.INTEGER,
          defaultValue: "",
        },
        events_ticket_price: {
          type: DataTypes.DECIMAL,
          defaultValue: "",
        },
      },
      { sequelize }
    );

    //this.hasMany(Ticket, { foreignKey: "ticket_id_event" });
    //this.belongsTo(Companies, { foreignKey: "companies_id" });

    return this;
  }
}
