import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("permissoes")
class Permissoes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Permissoes;
