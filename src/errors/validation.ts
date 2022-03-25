import validator from "validator";
import User from "../models/usersModel";
import Companies from "../models/companiesModel";
import Event from "../models/eventsModel";
import { Op } from "sequelize";

interface errorMessage {
  success: boolean;
  errors: Array<string>;
}

interface filterMessage {
  params: Array<unknown>;
}

export default class Validation {
  async validationUserFields(
    user_mail: string,
    user_phone: string,
    password_hash: string,
    user_cpf: string
  ): Promise<errorMessage> {
    const IReturn: errorMessage = { success: true, errors: [] };

    if (user_mail !== undefined && !validator.isEmail(user_mail)) {
      IReturn.success = false;
      IReturn.errors.push("E-mail inválido");
    } else if (
      user_mail !== undefined &&
      user_cpf !== undefined &&
      !(await this.userExists(user_mail, user_cpf))
    ) {
      IReturn.success = false;
      IReturn.errors.push("Usuário já existe");
    } else if (
      password_hash !== undefined &&
      !this.validatePassword(password_hash)
    ) {
      IReturn.success = false;
      IReturn.errors.push("A senha deve conter de 6 à 10 caracteres.");
    } else if (
      user_phone !== undefined &&
      !validator.isMobilePhone(user_phone, "pt-BR")
    ) {
      IReturn.success = false;
      IReturn.errors.push("Celular inválido.");
    } else if (user_cpf !== undefined && !this.validateCPF(user_cpf)) {
      IReturn.success = false;
      IReturn.errors.push("CPF inválido.");
    }

    return IReturn;
  }

  async validationCompanyFields(
    companies_mail: string,
    companies_phone: string,
    password_hash: string,
    companies_cnpj: string
  ): Promise<errorMessage> {
    const IReturn: errorMessage = { success: true, errors: [] };

    if (companies_mail !== undefined && !validator.isEmail(companies_mail)) {
      IReturn.success = false;
      IReturn.errors.push("E-mail inválido.");
    } else if (
      companies_mail !== undefined &&
      companies_cnpj !== undefined &&
      !(await this.companyExists(companies_mail, companies_cnpj))
    ) {
      IReturn.success = false;
      IReturn.errors.push("Organizador já existe");
    } else if (
      companies_phone !== undefined &&
      !validator.isMobilePhone(companies_phone, "pt-BR")
    ) {
      IReturn.success = false;
      IReturn.errors.push("Celular inválido.");
    } else if (
      password_hash !== undefined &&
      !this.validatePassword(password_hash)
    ) {
      IReturn.success = false;
      IReturn.errors.push("A senha deve conter de 6 à 10 caracteres.");
    } else if (
      companies_cnpj !== undefined &&
      !this.validateCNPJ(companies_cnpj)
    ) {
      IReturn.success = false;
      IReturn.errors.push("CNPJ inválido.");
    }

    return IReturn;
  }

  validationEventFields(events_ticket_price: string): errorMessage {
    const IReturn: errorMessage = { success: true, errors: [] };

    if (
      events_ticket_price !== undefined &&
      !validator.isDecimal(events_ticket_price)
    ) {
      IReturn.success = false;
      IReturn.errors.push("O valor do ingresso não é decimal");
    }

    return IReturn;
  }

  validationFilterFields(
    events_street: string,
    events_neighborhood: string,
    events_city: string,
    events_state: string
  ): filterMessage {
    const IReturn: filterMessage = { params: [] };

    if (events_street !== undefined && events_street !== "") {
      IReturn.params.push({ events_street: events_street });
    }

    if (events_neighborhood !== undefined && events_neighborhood !== "") {
      IReturn.params.push({ events_neighborhood: events_neighborhood });
    }

    if (events_city !== undefined && events_city !== "") {
      IReturn.params.push({ events_city: events_city });
    }

    if (events_state !== undefined && events_state !== "") {
      IReturn.params.push({ events_state: events_state });
    }

    return IReturn;
  }

  async validationTicketFields(
    events_id: number,
    events_tickets_available: number
  ): Promise<errorMessage> {
    const IReturn: errorMessage = { success: true, errors: [] };

    if (!(await this.removeTickets(events_id, events_tickets_available))) {
      IReturn.success = false;
      IReturn.errors.push("Não foi possível comprar o ingresso.");
    }

    return IReturn;
  }

  validatePassword(password: string): boolean {
    if (password.length < 6 || password.length > 10) return false;

    return true;
  }

  validateCPF(cpf: string): boolean {
    const regex = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
    if (!cpf.match(regex)) return false;

    return true;
  }

  validateCNPJ(cnpj: string): boolean {
    const regex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;
    if (!cnpj.match(regex)) return false;

    return true;
  }

  async userExists(user_mail: string, user_cpf: string) {
    const emailAlready = await User.findOne({
      where: { [Op.or]: [{ user_mail }, { user_cpf }] },
    });
    if (emailAlready) return false;

    return true;
  }

  async companyExists(companies_mail: string, companies_cnpj: string) {
    const emailAlready = await Companies.findOne({
      where: { [Op.or]: [{ companies_mail }, { companies_cnpj }] },
    });
    if (emailAlready) return false;

    return true;
  }

  async removeTickets(events_id: number, events_tickets_available: number) {
    const event = await Event.findByPk(events_id);
    events_tickets_available--;
    const updated = await event.update({ events_tickets_available });

    if (!updated) return false;

    return true;
  }
}
