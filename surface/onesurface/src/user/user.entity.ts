import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({type: 'varchar', name: 'job' })
  job: string;

  @Column({ type: 'varchar', name: 'age' })
  age: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

}