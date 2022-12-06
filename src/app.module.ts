import { Module } from '@nestjs/common';
import {TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from './config/config.module';
import { TypeOrmConfigModule } from './typeorm-config/typeorm-config.module';
import { TypeOrmConfigService } from './typeorm-config/typeorm-config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmConfigModule,
    TypeOrmModule.forRootAsync({
        name: 'postgres',
        useClass: TypeOrmConfigService
    })
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule]
})
export class AppModule {}
