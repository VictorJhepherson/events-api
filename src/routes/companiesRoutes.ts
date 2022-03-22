import { Router } from "express";
import companiesController from "../controllers/companiesController";
import { companyRequired } from "../middlewares/loginRequired";

const router = Router();

router.post("/", companiesController.createCompany);
router.post("/login", companiesController.loginCompany);
router.put("/", companyRequired, companiesController.updateCompany);

export default router;
