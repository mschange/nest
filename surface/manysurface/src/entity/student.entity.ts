import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Teacher } from "./teacher.entity";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: string;

    @Column()
    sex: string;

    @ManyToOne(() => Teacher, teacher => teacher.student)
    user: Teacher;

}