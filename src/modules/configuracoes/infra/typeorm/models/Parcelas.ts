import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("parcelas")
class Parcelas {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  ativo: number;

  @Column()
  parcela: number;

  @Column()
  tipo: string;

  @Column()
  taxa: number;

  @Column()
  valor: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Parcelas;
