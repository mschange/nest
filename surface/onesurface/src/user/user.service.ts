import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    
    let list = await this.userRepository.find();
    return list;
  }

  async findOne(query): Promise<User> {
    let list = await this.userRepository.findOne({ id: query.id });
    return list;
  }
  /* 
    新增用户
  */
  async addOne(rUser): Promise<String> {
    let list = await this.userRepository.insert(rUser);
    if (list) {
      return `新增成功!${list}`;
    } else {
      return '新增失败!';
    }
  }
  /* 
    修改用户
  */
  async updateOne(uUser): Promise<String> {
    let list = await this.userRepository.update({ id: uUser.id }, uUser);
    if (list) {
      return '修改成功!';
    } else {
      return '修改失败!';
    }
  }
  /* 
    删除用户
  */
  async delOne(query): Promise<String> {
    let list = await this.userRepository.delete({ id: query.id });
    if (list) {
      return '删除成功!';
    } else {
      return '删除失败!';
    }
  }
}
