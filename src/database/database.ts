import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import Users from "../models/usersModel";
import Companies from "../models/companiesModel";
import Tickets from "../models/ticketsModel";
import Events from "../models/eventsModel";

const NODE_ENV = process.env.NODE_ENV || "development";

const databaseConfig = require("../config/database.json")[NODE_ENV];

const models = [Users, Companies, Tickets, Events];

const sequelizeConnection = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect as Dialect,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

models.forEach((model) => model.initialize(sequelizeConnection));
