import ISendMailDTO from '../dtos/ISendEmailDTO'

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>
}
