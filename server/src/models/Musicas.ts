import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn} from 'typeorm';
import { GeneroMusicas } from './GeneroMusicas';
import { Pessoas } from './Pessoas';
import { Eventos } from './Eventos';

@Entity({ name: 'musicas' })
export class Musicas {
  @PrimaryGeneratedColumn({ name: 'cd_musica' })
  cd_musica: number;

  @Column({ name: 'cd_autor' })
  cd_autor: number;

  @Column({ name: 'cd_genero' })
  cd_genero: number;

  @Column({ name: 'nm_musica', length: 60, nullable: false })
  nm_musica: string;

  @Column({ name: 'ds_duracao', nullable: true })
  ds_duracao: string;

  @Column({ name: 'ds_descricao', length: 80, nullable: false })
  ds_descricao: string;

  @Column({ name: 'nm_album', length: 60, nullable: true })
  nm_album: string;

  @Column({ name: 'ds_link_cifra', length: 100, nullable: true })
  ds_link_cifra: string;

  @Column({ name: 'ds_link_video', length: 100, nullable: true })
  ds_link_video: string;

  @Column({ name: 'ds_link_letra', length: 100, nullable: true })
  ds_link_letra: string;

  @ManyToOne(() => GeneroMusicas)
  @JoinColumn({ name: 'cd_genero' })
  genero: GeneroMusicas;

  @ManyToOne(() => Pessoas)
  @JoinColumn({ name: 'cd_autor' })
  autor: Pessoas;

  @ManyToMany(() => Eventos, evento => evento.musicas)
  eventos: Eventos[];
}
