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
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (user: User) => {
      const password = user.get("password_hash") as string;
      let password_hash: string;
      if (password) {
        password_hash = await bcryptjs.hash(password, 8);
        user.set({ password_hash });
      }
    });

    return this;
  }

  async passwordIsValid(password: string) {
    const password_hash = this.get("password_hash") as string;
    return await bcryptjs.compare(password, password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Ticket, { foreignKey: "user_id" });
  }
}
