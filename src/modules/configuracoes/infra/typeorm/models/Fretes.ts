import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("fretes")
class Fretes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  ativo: number;

  @Column()
  lembrete: string;

  @Column()
  cep_minimo: string;

  @Column()
  cep_maximo: string;

  @Column()
  compra_minima: string;

  @Column()
  compra_maxima: string;

  @Column()
  valido_de: string;

  @Column()
  valido_ate: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Fretes;
