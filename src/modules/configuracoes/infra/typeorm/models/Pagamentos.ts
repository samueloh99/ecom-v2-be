import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("pagamentos")
class Pagamentos {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  ativo: number;

  @Column()
  public_key: string;

  @Column()
  secret_key: string;

  @Column()
  prazo_boleto: number;

  @Column()
  prazo_pix: number;

  @Column()
  boleto_ativo: number;

  @Column()
  pix_ativo: number;

  @Column()
  boleto_desconto: number;

  @Column()
  pix_desconto: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pagamentos;
