import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'genero_musicas' })
export class GeneroMusicas {
  @PrimaryGeneratedColumn({ name: 'cd_genero' })
  cd_genero: number;

  @Column({ name: 'ds_genero', length: 40, nullable: false })
  ds_genero: string;
}