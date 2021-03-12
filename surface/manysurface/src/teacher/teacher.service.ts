import { Injectable } from '@nestjs/common';

// 引入typeorm相关
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, getConnection } from 'typeorm';

// 引入实体类
import { Student } from '../entity/student.entity';
import { Teacher } from '../entity/teacher.entity';
@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly userRepository: Repository<Teacher>
  ) {}

  // 创建
  async addTeacher(rUser, manager: EntityManager) {

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const teachers = queryRunner.manager.find(Teacher, {
      relations: ['student']
    });

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const res = await queryRunner.manager.insert(Teacher, {
        name: rUser.name,
        age: rUser.age,
        curriculum: rUser.curriculum
      })
      console.log('res--->', res.raw.insertId);
      for (let i = 0; i < rUser.student.length; i += 1) {
        await queryRunner.manager.insert(Student, {
          name: rUser.student[i].name,
          age: rUser.student[i].age,
          sex: rUser.student[i].sex,
          user: {id: res.raw.insertId }
        })
      }
      // 提交事务
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err, '-----err')
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
    }
    return teachers;
  }

  // 根据id去查询
  async one(query) {
    let list = await this.userRepository.findOne(
      { id: query.id },
      { relations: ['student'] }, // 查询从表的名称
    );
    console.log(list, '----')
    return list;
  }
  // 查询全部
  async findAlls() {
    const teachers = await this.userRepository.find({relations: ['student']});
    return teachers;
  }
  // 删除
  async delate(rUser, manager) {
    // let t = await this.userRepository.delete()
    let teach = await this.userRepository.findOne({ id: rUser.id });
    if (teach) {
      const connection = getConnection();
      const queryRunner = connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.delete<Student>(Student, { id: rUser.sId });
        await queryRunner.commitTransaction();
        return "删除成功了"
      } catch (err) {
        queryRunner.rollbackTransaction();
        return '删除失败了';
      }
    } else {
      return "该老师不存在~"
    }
  }

  // 修改数据
  async update(rUser, manger) {
    let teach = await this.userRepository.findOne({ id: rUser.id });
    if (teach) {
      const connection = getConnection();
      const queryRunner = connection.createQueryRunner();
      await queryRunner.connect();

      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.update<Teacher>(Teacher, { id: rUser.id }, { age: "38", name: "刘思" });
        await queryRunner.manager.update<Student>(Student, { id: rUser.sId }, { age: "38", name: "改天" });
        await queryRunner.commitTransaction();
        return 'transaction done'
      } catch (err) {
        await queryRunner.rollbackTransaction();
        return 'transaction failed'
      }
    } else {
      return `用户id为${rUser.id}的老师不存在`;
    }
  }
}
