import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Pedido from "@modules/pedidos/infra/typeorm/models/Pedidos";
import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";

@Entity("transmissions")
class Transmissions {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  message: string;

  @Column()
  pedido_id: number;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: "pedido_id" })
  pedido_id_fk: Pedido;

  @Column()
  servico: string;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario_id_fk: Usuario;

  @CreateDateColumn()
  created_at: Date;
}

export default Transmissions;
