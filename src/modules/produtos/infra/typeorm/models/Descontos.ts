import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("descontos")
class Descontos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  produto_id: number;

  @Column()
  desconto_tipo: number;

  @Column()
  desconto_valor: number;

  @Column()
  data_desconto_1: Date;

  @Column()
  data_desconto_2: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Descontos;
