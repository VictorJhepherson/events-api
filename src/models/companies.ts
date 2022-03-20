import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface CompaniesAttributes {
  companies_id: number;
  companies_name_responsable: string;
  companies_cnpj: string;
  companies_phone: string;
  companies_mail: string;
  companies_password: string;
  companies_name_corporate: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CompaniesInput = Optional<CompaniesAttributes, "companies_id">;
export type CompaniesOutput = Required<CompaniesAttributes>;

class Companies
  extends Model<CompaniesAttributes, CompaniesInput>
  implements CompaniesAttributes
{
  public companies_id!: number;
  public companies_name_responsable!: string;
  public companies_cnpj!: string;
  public companies_phone!: string;
  public companies_mail!: string;
  public companies_password!: string;
  public companies_name_corporate!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        companies_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        companies_name_responsable: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        companies_cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        companies_phone: {
          type: DataTypes.STRING,
        },
        companies_mail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        companies_password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        companies_name_corporate: {
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

export default Companies;
