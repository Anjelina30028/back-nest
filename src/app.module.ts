import { Module, Next } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypegooseModule } from 'nestjs-typegoose'
import { getMongoDbConfig } from './config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { FileModule } from './file/file.module';
import { RequestModule } from './request/request.module';
import { ManagerModule } from './manager/manager.module';
import { ProjectModule } from './project/project.module';
import { CallModule } from './call/call.module';

 
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory: getMongoDbConfig
    }),
    AuthModule,
    UserModule,
    GenreModule,
    FileModule,
    RequestModule,
    ManagerModule,
    ProjectModule,
    CallModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

