import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import User from "../models/usersModel";
import { sign } from "jsonwebtoken";

import Validation from "../errors/validation";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { user_cpf, user_phone, user_email, user_password } = req.body;

      const validation = new Validation().validationUserFields(
        user_email,
        user_phone,
        user_password,
        user_cpf
      );

      if ((await validation).success) {
        const newUser = await User.create(req.body);

        return res
          .status(200)
          .json({ success: true, data: newUser, token: "", errors: [] });
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

  async updateUser(req: Request, res: Response) {
    try {
      const { user_id, user_email, user_cpf, user_password, user_phone } =
        req.body;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(401).json({
          success: false,
          data: "",
          token: "",
          errors: ["Usuário não existe"],
        });
      }

      const validation = new Validation().validationUserFields(
        user_email,
        user_phone,
        user_password,
        user_cpf
      );

      if ((await validation).success) {
        const newData = await user.update(req.body);

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

  async loginUser(req: Request, res: Response) {
    try {
      const { user_email, user_password } = req.body;
      const user = await User.findOne({ where: { user_email } });

      if (!user) {
        return res.status(401).json({
          success: false,
          data: "",
          token: "",
          errors: ["Usuário não encontrado"],
        });
      }

      if (!(await user.passwordIsValid(user_password))) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Senha inválida"],
        });
      }

      const token = sign(
        { user_email, user_password },
        process.env.JWT_SECRET || "#ventsMBL4bs",
        { expiresIn: "7d" }
      );

      return res
        .status(200)
        .json({ success: true, data: user, token: token, errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }
}

export default new UserController();
