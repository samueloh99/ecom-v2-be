import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("cupons")
class Cupons {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  tipo: number;

  @Column()
  ativo: number;

  @Column()
  data_1: Date;

  @Column()
  data_2: Date;

  @Column()
  nome: string;

  @Column()
  codigo: string;

  @Column()
  quantidade: number;

  @Column()
  desconto_tipo: string;

  @Column()
  desconto_valor: number;

  @Column()
  minimo_item: number;

  @Column()
  minimo_compra: number;

  @Column()
  frete_gratis: number;

  @Column()
  desconto_produto: number;

  @Column()
  desconto_pagamento: number;

  @Column()
  reutilizavel: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cupons;
