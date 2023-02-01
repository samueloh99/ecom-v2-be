import Usuarios from "@modules/usuarios/infra/typeorm/models/Usuarios";

export interface IResponse {
  usuarios: Usuarios[];
  pag: {
    paginas: number;
    atual: number;
    encontrados: number;
    exibindo: number;
  };
}

export interface IRequest {
  perPage: number;
  currentPage: number;
  codigo?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  genero?: string;
  telefone?: string;
  celular?: string;
  recebeNewsletter?: string;
  cadastroInicio?: string;
  cadastroFim?: string;
}
