import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Skus from "@modules/skus/infra/typeorm/models/Skus";

@Entity("movimentacoes")
class Movimentacoes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  sku_id: number;

  @ManyToOne(() => Skus)
  @JoinColumn({ name: "sku_id" })
  sku_id_movimentacoes: Skus;

  @Column()
  localizacao: string;

  @Column()
  lancamento: string;

  @Column()
  quantidade: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Movimentacoes;
