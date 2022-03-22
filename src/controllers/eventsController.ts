import { Request, Response } from "express";
import Event from "../models/eventsModel";

class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      const newEvent = Event.create(req.body);

      return res
        .status(200)
        .json({ success: true, data: newEvent, token: "", errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const event = await Event.findByPk(req.params.id);

      if (!event) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Evento não existe"],
        });
      }

      const newData = await event.update(req.body);

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

  async showEvents(req: Request, res: Response) {
    try {
      const events = await Event.findAll();

      return res
        .status(200)
        .json({ success: true, data: events, token: "", errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }

  async filterEvents(req: Request, res: Response) {
    try {
      const { street, number, neighborhood, city, state } = req.body;

      const events = await Event.findAll({
        where: { street, number, neighborhood, city, state },
      });

      return res
        .status(200)
        .json({ success: true, data: events, token: "", errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }
}

export default new EventController();
