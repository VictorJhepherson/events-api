import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import Companies from "../models/companiesModel";
import { sign } from "jsonwebtoken";

import Validation from "../errors/validation";

class CompaniesController {
  async createCompany(req: Request, res: Response) {
    try {
      const { companies_mail, companies_phone, password_hash, companies_cnpj } =
        req.body;

      const validation = new Validation().validationCompanyFields(
        companies_mail,
        companies_phone,
        password_hash,
        companies_cnpj
      );

      if ((await validation).success) {
        const newCompany = await Companies.create(req.body);

        return res
          .status(200)
          .json({ success: true, data: newCompany, token: "", errors: [] });
      } else {
        const errors = (await validation).errors;
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: errors });
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({
          success: false,
          data: "",
          token: "",
          errors: [e.message],
        });
      }
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const {
        companies_id,
        companies_cnpj,
        companies_phone,
        companies_mail,
        password_hash,
      } = req.body;

      const companies = await Companies.findByPk(companies_id);

      if (!companies) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Organizador não existe"],
        });
      }

      const validation = new Validation().validationCompanyFields(
        companies_mail,
        companies_phone,
        password_hash,
        companies_cnpj
      );

      if ((await validation).success) {
        const newData = await companies.update(req.body);

        return res
          .status(200)
          .json({ success: true, data: newData, token: "", errors: [] });
      } else {
        const errors = (await validation).errors;
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: errors });
      }
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
      const { companies_mail, password_hash } = req.body;
      const company = await Companies.findOne({ where: { companies_mail } });

      if (!company) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Organizador não encontrado"],
        });
      }

      if (!(await company.passwordIsValid(password_hash))) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Senha inválida"],
        });
      }

      const companies_id = company.get("companies_id");

      const token = sign(
        { companies_id, companies_mail },
        process.env.JWT_SECRET || "#ventsMBL4bs",
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
