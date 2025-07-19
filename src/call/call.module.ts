import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CallModel } from './call.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypegooseModule.forFeature([
			{
				typegooseClass: CallModel,
				schemaOptions: {
					collection: 'Call',
				},
			},
		]),
    ConfigModule
  ],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}

