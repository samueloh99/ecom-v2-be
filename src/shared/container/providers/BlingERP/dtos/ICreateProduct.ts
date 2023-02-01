export default interface ICreateProduct {
  codigo: string;
  descricao: string;
  descricaoCurta: string;
  descricaoComplementar: string;
  un: string;
  vlr_unit: number;
  preco_custo: number;
  peso_bruto: number;
  peso_liq: number;
  origem: string;
  marca: string;
  largura: string;
  altura: string;
  profundidade: string;
  unidadeMedida: string;
  idCategoria: number;
  variacoes: {
    variacao: {
      nome: string;
      codigo: string;
      vlr_unit: number;
      clonarDadosPai: string;
      deposito: {
        id: number;
        estoque: number;
      };
    };
  };
  urlVideo: string;
}
