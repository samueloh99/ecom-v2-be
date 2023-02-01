import Enderecos from "@modules/usuarios/infra/typeorm/models/Enderecos";

export interface IResponse {
  enderecos: Enderecos[];
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
  cep?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  destinatario?: string;
  cadastroFim?: string;
  cadastroInicio?: string;
  usuarioId?: string;
}
