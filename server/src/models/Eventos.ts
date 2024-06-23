import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Musicas } from './Musicas';
import { Pessoas } from './Pessoas';
import { Usuarios } from './Usuarios';

@Entity({ name: 'eventos' })
export class Eventos {
  @PrimaryGeneratedColumn({ name: 'cd_evento' })
  cd_evento: number;

  @Column({ name: 'cd_usuario_responsavel' })
  cd_usuario_responsavel: number;

  @Column({ name: 'dt_evento', default: () => 'CURRENT_TIMESTAMP' })
  dt_evento: Date;

  @Column({ name: 'ds_evento', length: 100, nullable: false })
  ds_evento: string;

  @ManyToMany(() => Musicas, musicas => musicas.eventos)
  @JoinTable({
    name: 'evento_musicas',
    joinColumn: {
      name: 'cd_evento',
      referencedColumnName: 'cd_evento'
    },
    inverseJoinColumn: {
      name: 'cd_musica',
      referencedColumnName: 'cd_musica'
    }
  })
  musicas: Musicas[];

  @ManyToOne(() => Usuarios, usuario => usuario.cd_pessoa)
  @JoinColumn({ name: 'cd_usuario_responsavel' })
  responsavel: Usuarios;
}
