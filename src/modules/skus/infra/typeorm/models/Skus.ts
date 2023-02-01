import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";

import Produto from "@modules/produtos/infra/typeorm/models/Produtos";
import Variacao from "@modules/variacoes/infra/typeorm/models/Variacoes";

@Entity("skus")
class Skus {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  var1_id: number;

  @OneToOne(() => Variacao)
  @JoinColumn({ name: "var1_id" })
  var1fk: Variacao;

  @Column()
  var2_id: number;

  @OneToOne(() => Variacao)
  @JoinColumn({ name: "var2_id" })
  var2fk: Variacao;

  @Column()
  ativo: number;

  @Column()
  referencia: string;

  @Column()
  preco_custo: number;

  @Column()
  preco_venda: number;

  @Column()
  produto_id: number;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @Column()
  peso: number;

  @Column()
  gtin: string;

  @Column()
  mpn: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  estoque: number;

  @Column()
  foto1: string;

  @Column()
  foto2: string;

  @Column()
  foto3: string;

  @Column()
  foto4: string;

  @Column()
  foto5: string;

  @Column()
  foto6: string;
}

export default Skus;
