import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());
    this.app.use(cors());
  }
}

export default new App().app;
