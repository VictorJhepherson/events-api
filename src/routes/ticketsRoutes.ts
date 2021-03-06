import { Router } from "express";
import ticketsController from "../controllers/ticketsController";
import { userRequired } from "../middlewares/loginRequired";

const router = Router();

router.post("/", userRequired, ticketsController.createTicket);
router.get("/:id", userRequired, ticketsController.showTickets);

export default router;
