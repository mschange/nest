import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import  { UserController } from './user.controller';

// 引入user实体
import { User } from './user.entity';

// 引入typeorm
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
