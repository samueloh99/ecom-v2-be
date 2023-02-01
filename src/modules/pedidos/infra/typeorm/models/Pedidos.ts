import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";
import Endereco from "@modules/usuarios/infra/typeorm/models/Enderecos";
import Cupom from "@modules/cupons/infra/typeorm/models/Cupons";

@Entity("pedidos")
class Pedidos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  pedido_tipo: string;

  @Column()
  pedido_peso: string;

  @Column()
  pedido_qtde: number;

  @Column()
  pedido_prazo: number;

  @Column()
  pedido_desconto: number;

  @Column()
  pedido_carteira: number;

  @Column()
  pedido_total: number;

  @Column()
  pedido_geral: number;

  @Column()
  pedido_cancelado: string;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column()
  endereco_id: number;

  @ManyToOne(() => Endereco)
  @JoinColumn({ name: "endereco_id" })
  enderecoFk: Endereco;

  @Column()
  frete_nome: string;

  @Column()
  frete_titulo: string;

  @Column()
  frete_prazo: number;

  @Column()
  frete_valor: number;

  @Column()
  frete_embalagem: string;

  @Column()
  pagamento_nome: string;

  @Column()
  pagamento_titulo: string;

  @Column()
  pagamento_valor: string;

  @Column()
  pagamento_link: string;

  @Column()
  desconto_id: string;

  @ManyToOne(() => Cupom)
  @JoinColumn({ name: "desconto_id" })
  cupom_id_fk: string;

  @Column()
  parcela_numero: number;

  @Column()
  parcela_valor: number;

  @Column()
  parcela_desconto: number;

  @Column()
  cartao_nsu: string;

  @Column()
  cartao_bandeira: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  status_entrega: number;

  @Column()
  status_pagamento: number;

  @Column()
  utm_campaign: string;

  @Column()
  utm_source: string;

  @Column()
  utm_medium: string;

  @Column()
  utm_content: string;

  @Column()
  utm_term: string;

  @Column()
  data_aprovado: Date;

  @Column()
  data_entrega: Date;
}

export default Pedidos;
