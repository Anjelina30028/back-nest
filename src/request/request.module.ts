import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { RequestModel } from './request.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypegooseModule.forFeature([
			{
				typegooseClass: RequestModel,
				schemaOptions: {
					collection: 'Request',
				},
			},
		]),
    ConfigModule
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
