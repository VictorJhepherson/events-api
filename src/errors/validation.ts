import validator from "validator";

interface errorMessage {
  success: boolean;
  errors: Array<string>;
}

export default class Validation {
  validationUserFields(
    user_email: string,
    user_phone: string,
    user_password: string,
    user_cpf: string
  ): errorMessage {
    let IReturn!: errorMessage;

    if (!validator.isEmail(user_email)) {
      IReturn.success = false;
      IReturn.errors.push("E-mail inválido");
    } else if (!this.validatePassword(user_password)) {
      IReturn.success = false;
      IReturn.errors.push("A senha deve conter de 6 à 10 caracteres.");
    } else if (!validator.isMobilePhone(user_phone, "pt-BR")) {
      IReturn.success = false;
      IReturn.errors.push("Celular inválido.");
    } else if (!this.validateCPF(user_cpf)) {
      IReturn.success = false;
      IReturn.errors.push("CPF inválido.");
    }

    return IReturn;
  }

  validationCompanyFields(
    companies_mail: string,
    companies_phone: string,
    companies_password: string,
    companies_cnpj: string
  ): errorMessage {
    const IReturn: errorMessage = { success: true, errors: [] };

    if (!validator.isEmail(companies_mail)) {
      IReturn.success = false;
      IReturn.errors.push("E-mail inválido.");
    } else if (!validator.isMobilePhone(companies_phone, "pt-BR")) {
      IReturn.success = false;
      IReturn.errors.push("Celular inválido.");
    } else if (!this.validatePassword(companies_password)) {
      IReturn.success = false;
      IReturn.errors.push("A senha deve conter de 6 à 10 caracteres.");
    } else if (!this.validateCNPJ(companies_cnpj)) {
      IReturn.success = false;
      IReturn.errors.push("CNPJ inválido.");
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
}
