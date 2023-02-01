import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Exclude } from "class-transformer";

import Roles from "./Roles";
import Permissoes from "./Permissoes";

@Entity("usuarios")
class Usuarios {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  tipo: number;

  @Column()
  ativo: number;

  @Column()
  nome_completo: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  senha: string;

  @Column()
  celular: number;

  @Column()
  telefone: number;

  @Column()
  cpf: number;

  @Column()
  nascimento: string;

  @Column()
  genero: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Roles)
  @JoinTable({
    name: "usuarios_roles",
    joinColumns: [{ name: "usuario_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Roles[];

  @ManyToMany(() => Permissoes)
  @JoinTable({
    name: "usuarios_permissoes",
    joinColumns: [{ name: "usuario_id" }],
    inverseJoinColumns: [{ name: "permissoes_id" }],
  })
  permissoes: Permissoes[];

  @Column()
  ie: string;

  @Column()
  im: string;

  @Column()
  cnpj: string;

  @Column()
  newsletter: number;

  @Column()
  data_acesso: Date;

  @Column()
  total_pedidos: number;

  @Column()
  estrangeiro: number;
}

export default Usuarios;
