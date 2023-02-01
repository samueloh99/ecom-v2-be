export default interface IUpdateUsuarioDTO {
  id: number;
  tipo: number;
  ativo: number;
  nome_completo: string;
  email: string;
  senha: string;
  celular: number;
  telefone: number;
  cpf: number;
  nascimento: string;
  genero: string;
}
