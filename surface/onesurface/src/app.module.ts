
import { resolve } from 'path';
import { Module } from '@nestjs/common';


import { ConfigModule, ConfigService } from 'nestjs-config';

// 引入typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    UserModule
  ],
})
export class AppModule {}