import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany, BeforeInsert, BeforeUpdate} from 'typeorm';
import { Pessoas } from './Pessoas';
import {Eventos}   from './Eventos';
import bcrypt      from 'bcryptjs';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryColumn()
  cd_pessoa: number;

  @Column({ unique: true })
  ds_username: string

  @Column()
  ds_password: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dt_ultimo_acesso: Date;

  @OneToOne(() => Pessoas, pessoa => pessoa.cd_pessoa)
  @JoinColumn({ name: 'cd_pessoa' })
  pessoa: Pessoas;

  @OneToMany(() => Eventos, evento => evento.responsavel)
  eventos: Eventos[];

  @BeforeInsert()
  async hashPasswordInsert() {
    this.ds_password = await bcrypt.hash(this.ds_password, 10);
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    this.ds_password = await bcrypt.hash(this.ds_password, 10);
  }
}
