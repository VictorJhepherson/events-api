import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import User from "../models/usersModel";
import Companies from "../models/companiesModel";

interface CompanyPayload {
  companies_id: number;
  companie_mail: string;
}

interface UserPayload {
  user_id: number;
  user_mail: string;
}

export async function userRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = String(req.headers.authorization?.split(" ")[2]);
    const { user_id } = verify(
      token,
      process.env.JWT_SECRET || "#ventsMBL4bs"
    ) as UserPayload;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: "",
        token: "",
        errors: ["Usuário não existe"],
      });
    }

    req.user = user;

    return next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      data: "",
      token: "",
      errors: ["Falha na autenticação"],
    });
  }
}

export async function companyRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = String(req.headers.authorization?.split(" ")[2]);
    const { companies_id } = verify(
      token,
      process.env.JWT_SECRET || "#ventsMBL4bs"
    ) as CompanyPayload;

    const company = await Companies.findByPk(companies_id);

    if (!company) {
      return res.status(401).json({
        success: false,
        data: "",
        token: "",
        errors: ["Organizador não existe"],
      });
    }

    req.company = company;

    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      data: "",
      token: "",
      errors: ["Falha na autenticação"],
    });
  }
}
