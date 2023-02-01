import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("erps")
class Erps {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  api_key: string;

  @Column()
  codigo_deposito: string;

  @Column()
  ativo: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Erps;
