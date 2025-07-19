import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	Put,
	Query,
} from '@nestjs/common'
import { CallService } from './call.service'
import { CreateCallDto } from './dto/create-call.dto'
import { UpdateCallDto } from './dto/update-call.dto'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { LastCallDto } from './dto/last-call.dto'

@Controller('call')
export class CallController {
	constructor(private readonly callService: CallService) {}

	@HttpCode(200)
	@Post()
	async create() {
		return this.callService.create()
	}

	@Get()
	async findAll(@Query('searchTerm') searchTerm?: string) {
		return this.callService.findAllNew(searchTerm)
	}

	@Get('last')
	async findLast() {
		return this.callService.findALlAnswer()
	}

	@Get('/my/:id')
	async findAllOld(
    @Param('id', IdValidationPipe) id: string,
    @Query('searchTerm') searchTerm?: string) {
		return this.callService.findAllOld(id, searchTerm)
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.callService.findOne(+id)
	}

	// @Get('last')
	// async findALLAnswered() {
	// 	return await this.callService.findALlAnswer()
	// }

	@HttpCode(200)
	@Put(':id')
	update(@Param('id') id: string, @Body() CreateCallDto: CreateCallDto) {
		return this.callService.update(id, CreateCallDto)
	}

	@HttpCode(200)
	@Put('status/:id')
	updateManager(@Param('id') id: string, @Body() dto: UpdateCallDto) {
		return this.callService.updateStatus(id, dto) 
	}

	@HttpCode(200)
	@Put('last/:id')
	updateLast(@Param('id') id: string, @Body() dto: LastCallDto) {
		return this.callService.updateLast(id, dto) 
	} 

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.callService.remove(+id)
	// }
}
