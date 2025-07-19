import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'

@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	create() {
		return this.projectService.create()
	}

	@Get()
	findAll() {
		return this.projectService.findAll()
	}

	@Get(':id')
	findOne(@Param('id', IdValidationPipe) _id: string) {
		return this.projectService.byId(_id)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateProjectDto
	) {
		return this.projectService.update(id, dto)
	}

	@HttpCode(200)
	@Auth('admin')
	@Delete(':id')
	async remove(@Param('id', IdValidationPipe) _id: string) {
		return this.projectService.remove(_id)
	}

	@HttpCode(200)
	@Put('status/:id')
	async updateStatus(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateProjectDto
	) {
		return this.projectService.updateStatus(id, dto)
	}
}
