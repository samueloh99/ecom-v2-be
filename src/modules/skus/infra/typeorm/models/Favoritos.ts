import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import Sku from "@modules/skus/infra/typeorm/models/Skus";
import Usuario from "@modules/usuarios/infra/typeorm/models/Usuarios";

@Entity("favoritos")
class Favoritos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  sku_id: number;

  @ManyToOne(() => Sku)
  @JoinColumn({ name: "sku_id" })
  sku_id_fk: Sku;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario_id_fk: Usuario;

  @CreateDateColumn()
  created_at: Date;
}

export default Favoritos;
