import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import Companies from "../models/companiesModel";
import { sign } from "jsonwebtoken";

class CompaniesController {
  async createCompany(req: Request, res: Response) {
    try {
      const newCompany = await Companies.create(req.body);

      return res
        .status(200)
        .json({ success: true, data: newCompany, token: "", errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const companies = await Companies.findByPk(req.body.companies_id);

      if (!companies) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Organizador não existe"],
        });
      }

      const newData = await companies.update(req.body);

      return res
        .status(200)
        .json({ success: true, data: newData, token: "", errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }

  async loginCompany(req: Request, res: Response) {
    try {
      const { companies_mail, companies_password } = req.body;
      const company = await Companies.findOne({ where: { companies_mail } });

      if (!company) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Organizador não encontrado"],
        });
      }

      const token = sign(
        { companies_mail, companies_password },
        String(process.env.JWT_SECRET),
        { expiresIn: "7d" }
      );

      return res
        .status(200)
        .json({ success: true, data: company, token: token, errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }
}

export default new CompaniesController();
