import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';


import { TypeOrmModule } from '@nestjs/typeorm';

// 引入实体
import { Teacher } from '../entity/teacher.entity';
import { Student } from '../entity/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Teacher, Student ])
  ],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
