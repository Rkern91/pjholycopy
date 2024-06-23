import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pessoas' })
export class Pessoas {
  @PrimaryGeneratedColumn({name: 'cd_pessoa'})
  cd_pessoa: number;

  @Column({name: 'nm_pessoa', length: 60 })
  nm_pessoa: string;

  @Column({name: 'ds_email', length: 30, nullable: true })
  ds_email: string;
}
