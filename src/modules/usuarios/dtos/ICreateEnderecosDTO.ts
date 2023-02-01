export default interface ICreateEnderecosDTO {
  usuario_id: number;
  ativo: number;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  lembrete: string;
  destinatario: string;
}
