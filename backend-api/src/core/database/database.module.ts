import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

@Global()
@Module({
  providers: [],
  exports: [],
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
})
export class DatabaseModule { }