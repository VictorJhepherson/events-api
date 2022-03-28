import { Request, Response } from "express";
import Event from "../models/eventsModel";
import Ticket from "../models/ticketsModel";
import Validation from "../errors/validation";
import { col, fn, Op, where } from "sequelize";
import moment from "moment";

class TicketController {
  async createTicket(req: Request, res: Response) {
    try {
      const { events_id } = req.body;

      const event = await Event.findByPk(events_id);

      const tickets: number = event?.getDataValue("events_tickets_available");

      if (!tickets || tickets === 0) {
        return res.status(500).json({
          success: false,
          data: "",
          token: "",
          errors: ["Não há ingressos para esse evento"],
        });
      }

      const ticket = await Ticket.create({
        ticket_id_event: events_id,
        ticket_id_user: req.user.user_id,
      });

      const validation = new Validation().validationTicketFields(
        events_id,
        tickets
      );

      if ((await validation).success) {
        return res
          .status(200)
          .json({ success: true, data: ticket, token: "", errors: [] });
      } else {
        await Ticket.destroy({
          where: { tickets_id: ticket.get("tickets_id") as number },
        });

        return res.status(500).json({
          success: false,
          data: "",
          token: "",
          errors: ["Não foi possível comprar o ingresso."],
        });
      }
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
      const tickets = await Ticket.findAll({
        where: { ticket_id_user: req.params.id },
        include: {
          model: Event,
          required: true,
          where: where(fn("STR_TO_DATE", col("events_date"), "%d/%m/%Y"), {
            [Op.gt]: moment.utc().format("YYYY-MM-DD"),
          }),
        },
      });

      if (tickets.length >= 1) {
        return res
          .status(200)
          .json({ success: true, data: tickets, token: "", errors: [] });
      } else {
        return res.status(500).json({
          success: false,
          data: "",
          token: "",
          errors: ["Não há ingressos ou todos estão expirados."],
        });
      }
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
