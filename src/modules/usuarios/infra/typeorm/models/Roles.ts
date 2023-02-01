import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import Permissoes from "./Permissoes";

@Entity("roles")
class Roles {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @ManyToMany(() => Permissoes)
  @JoinTable({
    name: "permissoes_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permissoes_id" }],
  })
  permissoes: Permissoes[];

  @CreateDateColumn()
  created_at: Date;
}

export default Roles;
