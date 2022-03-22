import { Request, Response } from "express";
import Event from "../models/eventsModel";
import Ticket from "../models/ticketsModel";

class TicketController {
  async createTicket(req: Request, res: Response) {
    try {
      const event = await Event.findByPk(req.body.ticket_id_event);

      const tickets: number = event?.getDataValue("events_tickets_available");

      if (!tickets || tickets === 0) {
        return res.status(500).json({
          success: false,
          data: "",
          token: "",
          errors: ["Não há ingressos para esse evento"],
        });
      }

      const { ticket_id_user, ticket_id_event } = req.body;

      const ticket = await Ticket.create({ ticket_id_event, ticket_id_user });

      return res
        .status(200)
        .json({ success: true, data: ticket, token: "", errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }

  async showTickets(req: Request, res: Response) {
    try {
      const tickets = await Ticket.findAll({ where: req.body.ticket_id_user });

      return res
        .status(200)
        .json({ success: true, data: tickets, token: "", errors: [] });
    } catch (e) {
      if (e instanceof Error) {
        return res
          .status(500)
          .json({ success: false, data: "", token: "", errors: [e.message] });
      }
    }
  }
}

export default new TicketController();
