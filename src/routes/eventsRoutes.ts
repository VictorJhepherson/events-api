import { Router } from "express";
import eventsController from "../controllers/eventsController";
import { companyRequired, userRequired } from "../middlewares/loginRequired";

const router = Router();

router.post("/", companyRequired, eventsController.createEvent);
router.put("/", companyRequired, eventsController.updateEvent);
router.get("/", userRequired, eventsController.showEvents);
router.post("/show", userRequired, eventsController.filterEvents);

export default router;
