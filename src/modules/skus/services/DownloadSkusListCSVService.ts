import { injectable, inject } from "tsyringe";

import { Parser } from "json2csv";

import ISkusRepository from "@modules/skus/repositories/ISkusRepository";
import IDescontosRepository from "@modules/produtos/repositories/IDescontosRepository";

@injectable()
class DownloadSkusListCSVService {
  constructor(
    @inject("SkusRepository")
    private skusRepository: ISkusRepository,

    @inject("DescontosRepository")
    private descontosRepository: IDescontosRepository,
  ) {}

  public async execute(): Promise<string> {
    const listSkus = await this.skusRepository.listWithoutPagination();

    const descontos = await this.descontosRepository.list();

    const dateFormated = new Date(Date.now());

    const json2csvFile = new Parser({
      fields: [
        { label: "id", value: "id" },
        { label: "availability", value: "availability" },
        { label: "condition", value: "condition" },
        { label: "description", value: "description" },
        { label: "image_link", value: "image_link" },
        { label: "link", value: "link" },
        { label: "title", value: "title" },
        { label: "price", value: "price" },
        { label: "gtin", value: "gtin" },
        { label: "mpn", value: "mpn" },
        { label: "brand", value: "brand" },
        { label: "item_group_id", value: "item_group_id" },
        { label: "custom_label_0", value: "custom_label_0" },
        { label: "custom_label_1", value: "custom_label_1" },
        { label: "age_group", value: "age_group" },
        { label: "color", value: "color" },
        { label: "size", value: "size" },
        { label: "gender", value: "gender" },
        { label: "google_product_category", value: "google_product_category" },
        { label: "sale_price", value: "sale_price" },
        { label: "additional_image_link", value: "additional_image_link" },
      ],
    });

    const newData = listSkus
      .filter(item => item.produto.ativo === 1 && item.ativo === 1)
      .filter(item => item.estoque > 0)
      .map(item => {
        const produtoDesconto = descontos.find(
          desconto => desconto.produto_id === item.produto_id,
        );

        const validateDesconto =
          produtoDesconto !== undefined &&
          dateFormated > produtoDesconto.data_desconto_1 &&
          dateFormated < produtoDesconto.data_desconto_2 &&
          produtoDesconto;

        const preco_desconto =
          validateDesconto !== false &&
          (validateDesconto.desconto_tipo === 1
            ? item.preco_venda - validateDesconto.desconto_valor
            : item.preco_venda -
              item.preco_venda * (validateDesconto.desconto_valor / 100));

        return {
          id: `${item.produto_id}-${item.id}`,
          availability: "in stock",
          condition: "new",
          description: item.produto.descricao,
          image_link: item.foto1,
          link: `https://chaes.com.br/produto/${item.produto_id}`,
          title: item.produto.nome,
          price: `${item.preco_venda.toFixed(2)} BRL`,
          gtin: "",
          mpn: "",
          brand: "Chaes",
          item_group_id: item.produto_id,
          custom_label_0: item.produto.categoria_id,
          custom_label_1: item.produto.categoria.nome,
          age_group: "adult",
          color: item.var1fk.nome,
          size: item.var2fk.nome,
          gender: "female",
          google_product_category: "",
          sale_price:
            preco_desconto === false
              ? `${item.preco_venda.toFixed(2)} BRL`
              : `${preco_desconto.toFixed(2)} BRL`,
          additional_image_link: item.foto2,
        };
      });

    const csv = json2csvFile.parse(newData);

    return csv;
  }
}

export default DownloadSkusListCSVService;
