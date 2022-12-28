import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/guards/jwt-auth.guard';
import { UserModule } from './app/users/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmConfigModule } from './typeorm-config/typeorm-config.module';
import { TypeOrmConfigService } from './typeorm-config/typeorm-config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmConfigModule,
    TypeOrmModule.forRootAsync({
      name: 'default',
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
