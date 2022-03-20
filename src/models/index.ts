//import { Options, Sequelize } from "sequelize";

import Database from "../database/config";

import User from "./users";
import Companies from "./companies";
import Ticket from "./tickets";
import Event from "./events";

const models = [User, Companies, Ticket, Event];
models.forEach((model) => model.initialize(Database));

export { User, Companies, Ticket, Event };
