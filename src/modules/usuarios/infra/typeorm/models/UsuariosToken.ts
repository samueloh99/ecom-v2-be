import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";

@Entity("usuario_tokens")
class UsuarioToken {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  usuario_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UsuarioToken;
