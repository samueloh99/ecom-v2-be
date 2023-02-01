import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("correios")
class Correios {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  ativo: number;

  @Column()
  cnpj: string;

  @Column()
  cartao_postagem: string;

  @Column()
  codigo_adm: string;

  @Column()
  titular: string;

  @Column()
  central: string;

  @Column()
  usuario_sigep: string;

  @Column()
  senha_sigep: string;

  @Column()
  pac_cod: string;

  @Column()
  sedex_cod: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Correios;
