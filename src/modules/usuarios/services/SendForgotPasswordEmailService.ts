import { injectable, inject } from "tsyringe";
import path from "path";

import AppError from "@shared/errors/AppError";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUsuarioTokensRepository from "@modules/usuarios/repositories/IUsuarioTokensRepository";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("UsuarioTokensRepository")
    private usuarioTokensRepository: IUsuarioTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const usuario = await this.usuariosRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError("Email não cadastrado.", 203);
    }

    const { token } = await this.usuarioTokensRepository.generate(usuario.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "forgotPassword.hbs",
    );

    await this.mailProvider.sendMail({
      to: {
        name: usuario.nome_completo,
        email: usuario.email,
      },
      subject: "[Chae's] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: usuario.nome_completo,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
