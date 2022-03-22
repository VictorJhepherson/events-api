import { DataTypes, Model, Sequelize } from "sequelize";
import bcryptjs from "bcryptjs";

export default class Companies extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        companies_name_responsable: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        companies_cnpj: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            is: /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/,
          },
        },
        companies_phone: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        companies_mail: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: true,
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        companies_password: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 10],
              msg: "A senha precisa ter entre 6 e 10 caracteres",
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        companies_name_corporate: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (company: Companies) => {
      const password = company.get("companies_password") as string;
      let password_hash = company.get("password_hash");
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
