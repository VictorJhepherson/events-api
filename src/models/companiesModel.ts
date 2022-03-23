import { DataTypes, Model, Sequelize } from "sequelize";
import bcryptjs from "bcryptjs";

export default class Companies extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        companies_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
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
          allowNull: false,
        },
        companies_mail: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        companies_name_corporate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (company: Companies) => {
      const password = company.get("password_hash") as string;
      let password_hash: string;
      if (password) {
        password_hash = await bcryptjs.hash(password, 8);
        company.set({ password_hash });
      }
    });

    return this;
  }

  passwordIsValid(password: string) {
    const password_hash = this.get("password_hash") as string;
    return bcryptjs.compare(password, password_hash);
  }
}
