import { Router } from "express";
import ticketsController from "../controllers/ticketsController";
import { userRequired } from "../middlewares/loginRequired";

const router = Router();

router.post("/", userRequired, ticketsController.createTicket);
router.post("/show", userRequired, ticketsController.showTickets);

export default router;
