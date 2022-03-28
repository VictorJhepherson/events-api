import { Request, Response } from "express";
import Event from "../models/eventsModel";
import Validation from "../errors/validation";
import { col, fn, Op, where } from "sequelize";
import moment from "moment";

class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      const {
        events_name,
        events_date,
        events_description,
        events_street,
        events_number,
        events_neighborhood,
        events_city,
        events_state,
        events_tickets_available,
        events_ticket_price,
      } = req.body;
      const { companies_id } = req.company;

      const validation = new Validation().validationEventFields(
        events_ticket_price
      );

      if (validation.success) {
        const newEvent = await Event.create({
          events_name: events_name,
          events_date: events_date,
          events_description: events_description,
          events_street: events_street,
          events_number: events_number,
          events_neighborhood: events_neighborhood,
          events_city: events_city,
          events_state: events_state,
          events_tickets_available: events_tickets_available,
          events_ticket_price: events_ticket_price,
          events_id_companies: companies_id,
        });

        if (newEvent) {
          return res
            .status(200)
            .json({ success: true, data: newEvent, token: "", errors: [] });
        } else {
          return res.status(500).json({
            success: false,
            data: "",
            token: "",
            errors: ["Não foi possível criar o evento."],
          });
        }
      } else {
        const errors = validation.errors;
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

  async updateEvent(req: Request, res: Response) {
    try {
      const { events_id, events_ticket_price } = req.body;

      const event = await Event.findByPk(events_id);

      if (!event) {
        return res.status(400).json({
          success: false,
          data: "",
          token: "",
          errors: ["Evento não existe"],
        });
      }

      const validation = new Validation().validationEventFields(
        events_ticket_price
      );

      if (validation.success) {
        const newData = await event.update(req.body);

        if (newData) {
          return res
            .status(200)
            .json({ success: true, data: newData, token: "", errors: [] });
        } else {
          return res.status(500).json({
            success: false,
            data: "",
            token: "",
            errors: ["Não foi possível atualizar os dados do evento."],
          });
        }
      } else {
        const errors = validation.errors;
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

  async showEvents(req: Request, res: Response) {
    try {
      const events = await Event.findAll({
        where: where(fn("STR_TO_DATE", col("events_date"), "%d/%m/%Y"), {
          [Op.gt]: moment.utc().format("YYYY-MM-DD"),
        }),
      });

      if (events.length >= 1) {
        return res
          .status(200)
          .json({ success: true, data: events, token: "", errors: [] });
      } else {
        return res.status(500).json({
          success: false,
          data: "",
          token: "",
          errors: ["Não há eventos disponíveis."],
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

  async filterEvents(req: Request, res: Response) {
    try {
      const { events_street, events_neighborhood, events_city, events_state } =
        req.body;

      const validation = new Validation().validationFilterFields(
        events_street,
        events_neighborhood,
        events_city,
        events_state
      );

      if (validation.params.length >= 1) {
        const events = await Event.findAll({
          where: {
            [Op.and]: where(fn("STR_TO_DATE", col("events_date"), "%d/%m/%Y"), {
              [Op.gt]: moment.utc().format("YYYY-MM-DD"),
            }),
            [Op.or]: validation.params,
          },
        });

        if (events.length >= 1) {
          return res
            .status(200)
            .json({ success: true, data: events, token: "", errors: [] });
        } else {
          return res.status(500).json({
            success: false,
            data: "",
            token: "",
            errors: ["Não há eventos com esse(s) filtros ou já expiraram."],
          });
        }
      } else {
        return res.status(500).json({
          success: false,
          data: "",
          token: "",
          errors: ["Todos os campos de filtro estão vazios."],
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

export default new EventController();
