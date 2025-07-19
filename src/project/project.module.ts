import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProjectModel } from './project.model';

@Module({
  imports:[
    TypegooseModule.forFeature([
			{
				typegooseClass: ProjectModel,
				schemaOptions: {
					collection: 'Project',
				},
			},
		])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
