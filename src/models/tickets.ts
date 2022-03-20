import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface TicketsAttributes {
  ticket_id: number;
  ticket_price: number;
  ticket_expires: Date;
  ticket_purchase_date: Date;
  ticket_id_user: number;
  ticker_id_event: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TicketInput = Optional<TicketsAttributes, "ticket_id">;
export type TicketOutput = Required<TicketsAttributes>;

class Ticket
  extends Model<TicketsAttributes, TicketInput>
  implements TicketsAttributes
{
  public ticket_id!: number;
  public ticket_price!: number;
  public ticket_expires!: Date;
  public ticket_purchase_date!: Date;
  public ticket_id_user!: number;
  public ticker_id_event!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        ticket_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        ticket_price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        ticket_expires: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ticket_purchase_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ticket_id_user: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        ticker_id_event: {
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

export default Ticket;
