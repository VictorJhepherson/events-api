import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface UsersAttributes {
  user_id: number;
  user_name: string;
  user_cpf: string;
  user_phone: string;
  user_mail: string;
  user_password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserInput = Optional<UsersAttributes, "user_id">;
export type UserOutput = Required<UsersAttributes>;

class User
  extends Model<UsersAttributes, UserInput>
  implements UsersAttributes
{
  public user_id!: number;
  public user_name!: string;
  public user_cpf!: string;
  public user_phone!: string;
  public user_mail!: string;
  public user_password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_cpf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_phone: {
          type: DataTypes.STRING,
        },
        user_mail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_password: {
          type: DataTypes.STRING,
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

export default User;
