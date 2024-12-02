import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ length: 100 })
  author: string;

  @Column({ length: 10 })
  releaseDate: string;
}
