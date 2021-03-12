import { Controller, Get, Post, Body, Query } from '@nestjs/common';

// 引入service
import { TeacherService } from './teacher.service';

import { Transaction, TransactionManager, EntityManager } from 'typeorm';

@Controller('teacher')
export class TeacherController {

  constructor(
    private readonly teacherService: TeacherService
  ) {}

  @Get("test")
  test() {
    return '这是测试测试用的'
  }

  // 新增数据
  @Post("adds")
  @Transaction()
  add(@Body() rUser, @TransactionManager() manager: EntityManager,) {
    console.log(rUser, '--------')
    // return '这是新增'
    return this.teacherService.addTeacher(rUser, manager);
  }

  // 修改数据
  @Post('update')
  @Transaction()
  update(@Body() rUser, @TransactionManager() manager: EntityManager) {
    // return "这是修改内容"
    return this.teacherService.update(rUser, manager);
  }

  // 查询全部的数据
  @Get("select")
  select() {
    // return "这是查询全部的数据"
    return this.teacherService.findAlls();
  }

  // 根据条件去查询单条数据
  @Get("one")
  one(@Query() query) {
    console.log(query, 'query');
    // return "这是根据条件去查询"
    return this.teacherService.one(query);
  }

  // 删除数据
  @Post("delate")
  @Transaction()
  delate(@Body() rUser, @TransactionManager() manager: EntityManager) {
    // return '这是删除数据'
    return this.teacherService.delate(rUser, manager);
  }
}
