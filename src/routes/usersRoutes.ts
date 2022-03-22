import { Router } from "express";
import usersController from "../controllers/usersController";
import { userRequired } from "../middlewares/loginRequired";

const router = Router();

router.post("/", usersController.createUser);
router.post("/login", usersController.loginUser);
router.put("/", userRequired, usersController.updateUser);

export default router;
