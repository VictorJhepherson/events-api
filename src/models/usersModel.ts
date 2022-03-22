import { Model, DataTypes, Sequelize } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        user_name: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 60],
              msg: "Campo nome deve ter entre 3 e 60 caracteres",
            },
          },
        },
        user_cpf: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            is: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/,
          },
        },
        user_phone: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        user_mail: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: true,
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        user_password: {
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
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (user: User) => {
      const password = user.get("user_password") as string;
      let password_hash = user.get("password_hash");
      if (password) {
        password_hash = await bcryptjs.hash(password, 8);
        user.set({ password_hash });
      }
    });

    return this;
  }

  passwordIsValid(password: string) {
    const password_hash = this.get("password_hash") as string;
    return bcryptjs.compare(password, password_hash);
  }
}
