import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("logs")
class Logs {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  responsavel: string;

  @Column()
  tela: string;

  @Column()
  acao: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Logs;
