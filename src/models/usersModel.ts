import { Model, DataTypes, Sequelize } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
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
          allowNull: false,
        },
        user_mail: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        user_password: {
          type: DataTypes.STRING,
          allowNull: false,
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
