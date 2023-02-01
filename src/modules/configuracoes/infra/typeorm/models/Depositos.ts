import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("depositos")
class Depositos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  ativo: number;

  @Column()
  lembrete: string;

  @Column()
  cep_deposito: string;

  @Column()
  cep_minimo: string;

  @Column()
  cep_maximo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Depositos;
