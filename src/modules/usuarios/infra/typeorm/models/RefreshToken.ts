import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import Usuario from "./Usuarios";

@Entity("refresh_token")
class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  expiresIn: number;

  @Column()
  usuario_id: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @CreateDateColumn()
  created_at: Date;
}

export default RefreshToken;
