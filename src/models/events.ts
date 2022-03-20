import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface EventsAttributes {
  events_id: number;
  events_name: string;
  events_date: Date;
  events_description: string;
  events_street: string;
  events_number: number;
  events_neighborhood: string;
  events_city: string;
  events_state: string;
  events_tickets_available: number;
  events_id_companies: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EventInput = Optional<EventsAttributes, "events_id">;
export type EventOutput = Required<EventsAttributes>;

class Event
  extends Model<EventsAttributes, EventInput>
  implements EventsAttributes
{
  public events_id!: number;
  public events_name!: string;
  public events_date!: Date;
  public events_description!: string;
  public events_street!: string;
  public events_number!: number;
  public events_neighborhood!: string;
  public events_city!: string;
  public events_state!: string;
  public events_tickets_available!: number;
  public events_id_companies!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        events_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        events_name: {
          type: DataTypes.STRING,
        },
        events_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        events_description: {
          type: DataTypes.STRING,
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
        events_id_companies: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        sequelize: sequelize,
        paranoid: true,
      }
    );
  }
}

export default Event;
