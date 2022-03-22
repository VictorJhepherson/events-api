import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

import "./database/database";

import usersRoutes from "./routes/usersRoutes";
import companiesRoutes from "./routes/companiesRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import ticketsRoutes from "./routes/ticketsRoutes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setupExpress();
    this.setupRoutes();
  }

  private setupExpress(): void {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.app.use("/user", usersRoutes);
    this.app.use("/company", companiesRoutes);
    this.app.use("/event", eventsRoutes);
    this.app.use("/ticket", ticketsRoutes);
  }
}

export default new App().app;
