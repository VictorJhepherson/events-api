import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import User from "../models/usersModel";
import { sign } from "jsonwebtoken";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);

      return res
        .status(200)
        .json({ success: true, data: newUser, token: "", errors: [] });
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
      const user = await User.findByPk(req.body.user_id);

      if (!user) {
        return res.status(401).json({
          success: false,
          data: "",
          token: "",
          errors: ["Usuário não existe"],
        });
      }

      const newData = await user.update(req.body);

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

      const token = sign(
        { user_email, user_password },
        String(process.env.JWT_SECRET),
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
