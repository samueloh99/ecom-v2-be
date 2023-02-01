import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";
import Pedido from "@modules/pedidos/infra/typeorm/models/Pedidos";

@Entity("carteiras")
class Carteiras {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario_id_fk: Usuario;

  @Column()
  pedido_id: number;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: "pedido_id" })
  pedido_id_fk: Usuario;

  @Column()
  movimentacao: string;

  @Column()
  valor_carteira: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Carteiras;
