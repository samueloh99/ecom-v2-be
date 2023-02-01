import { injectable, inject } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import aws from "aws-sdk";

import mailConfig from "@config/mail";

import ISendMailDTO from "../dtos/ISendEmailDTO";
import IMailProvider from "../models/IMailProvider";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const ses = new aws.SES({
      apiVersion: "2010-12-01",
      region: "us-west-2",
    });
    this.client = nodemailer.createTransport({
      SES: { ses, aws },
    });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client
      .sendMail({
        from: {
          name: "Chaes",
          address: "atendimento@chaes.com.br",
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      })
      .catch(err => console.log(err));
  }
}
