import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Marca from "@modules/marcas/infra/typeorm/models/Marcas";
import Categoria from "@modules/categorias/infra/typeorm/models/Categorias";
import Fornecedor from "@modules/fornecedores/infra/typeorm/models/Fornecedores";

@Entity("produtos")
class Produtos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nome: string;

  @Column()
  slug: string;

  @Column()
  referencia: string;

  @Column()
  ncm: string;

  @Column()
  marca_id: number;

  @ManyToOne(() => Marca)
  @JoinColumn({ name: "marca_id" })
  marca: Marca;

  @Column()
  fornecedor_id: number;

  @ManyToOne(() => Fornecedor)
  @JoinColumn({ name: "fornecedor_id" })
  fornecedor: Fornecedor;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: "categoria_id" })
  categoria: Categoria;

  @Column("int", { array: true })
  sub_categorias_ids: number[];

  @Column("int", { array: true })
  tags: number[];

  @Column()
  comprimento: string;

  @Column()
  altura: string;

  @Column()
  largura: string;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  ativo: number;

  @Column()
  tipo_produto_id: number;
}

export default Produtos;
