import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Teacher {

    // 老师的id，主键
    @PrimaryGeneratedColumn()
    id: number;
    
    // 姓名
    @Column()
    name: string;

    // 年龄
    @Column({ type: 'varchar', name: "age" })
    age: string;

    // 主修课程
    @Column({ type: 'varchar', name: 'curriculum' })
    curriculum: string

    // 所带学生
    @OneToMany(() => Student, student => student.user)
    student: Student[];

}