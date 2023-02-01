import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

import Pedido from "@modules/pedidos/infra/typeorm/models/Pedidos";
import Produto from "@modules/produtos/infra/typeorm/models/Produtos";
import Sku from "@modules/skus/infra/typeorm/models/Skus";
import Desconto from "@modules/produtos/infra/typeorm/models/Descontos";

@Entity("pedidosProdutos")
class PedidosProdutos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  pedido_id: number;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: "pedido_id" })
  pedido_id_fk: Pedido;

  @Column()
  produto_id: number;

  @OneToOne(() => Produto)
  @JoinColumn({ name: "produto_id" })
  produto_id_fk: Produto;

  @Column()
  sku_id: number;

  @OneToOne(() => Sku)
  @JoinColumn({ name: "sku_id" })
  sku_id_fk: Sku;

  @Column()
  quantidade: number;

  @Column()
  cancelado: string;

  @Column()
  troca: string;

  @Column()
  pontos: string;

  @Column()
  preco: number;

  @Column()
  total: number;

  @Column()
  json_pers: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  desconto_id: number;

  @OneToOne(() => Desconto)
  @JoinColumn({ name: "desconto_id" })
  desconto_id_fk: Desconto;
}

export default PedidosProdutos;
