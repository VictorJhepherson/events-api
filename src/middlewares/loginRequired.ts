import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import User from "../models/usersModel";
import Companies from "../models/companiesModel";

interface TokenPayload {
  id: number;
}

export async function userRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = String(req.headers.authorization?.split(" ")[1]);
    const { id: user_id } = verify(
      token,
      String(process.env.JWT_SECRET)
    ) as TokenPayload;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: "",
        token: "",
        errors: ["Usuário não existe"],
      });
    }

    //req.user = user;

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
    const token = String(req.headers.authorization?.split(" ")[1]);
    const { id: companies_id } = verify(
      token,
      String(process.env.JWT_SECRET)
    ) as TokenPayload;

    const company = await Companies.findByPk(companies_id);

    if (!company) {
      return res.status(401).json({
        success: false,
        data: "",
        token: "",
        errors: ["Organizador não existe"],
      });
    }

    //req.company = company;

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
