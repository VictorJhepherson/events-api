import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import User from "../models/usersModel";
import { sign } from "jsonwebtoken";

import Validation from "../errors/validation";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { user_cpf, user_phone, user_mail, password_hash } = req.body;

      const validation = new Validation().validationUserFields(
        user_mail,
        user_phone,
        password_hash,
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
      const { user_id, user_mail, user_cpf, password_hash, user_phone } =
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
        user_mail,
        user_phone,
        password_hash,
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
      const { email, password_hash } = req.body;
      const user = await User.findOne({ where: { user_mail: email } });

      if (!user) {
        return res.status(401).json({
          success: false,
          data: "",
          token: "",
          errors: ["Usuário não encontrado"],
        });
      }

      if (!(await user.passwordIsValid(password_hash))) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Senha inválida"],
        });
      }

      const user_id = user.get("user_id");

      const token = sign(
        { user_id: user_id, user_mail: email },
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
