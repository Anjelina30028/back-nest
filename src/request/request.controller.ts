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
  Query,
} from '@nestjs/common'
import { RequestService } from './request.service'
import { CreateRequestDto } from './dto/create-request.dto'
import { UpdateRequestDto } from './dto/update-request.dto'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { RequestModel } from './request.model'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { searchIndex } from '@typegoose/typegoose'

@Controller('request')
export class RequestController {
	constructor(private readonly requestService: RequestService) {}

	@Post()
	@HttpCode(200)
	async create() {
		return this.requestService.create()
	}

	@Get()
	async findAll(@Query('searchTerm') searchTerm?: string) {
	  return this.requestService.findAll(searchTerm);
	}
	
	@Get('/new')
	async findNew(@Query('searchTerm') searchTerm?: string){
		return this.requestService.findNew(searchTerm)
	}

	@Get('/old/:id')
	async findOld(
		@Param('id', IdValidationPipe) id: string, 
		@Query('searchTerm') searchTerm?: string)
		{
		return this.requestService.findOld(id, searchTerm)
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.requestService.findOne(+id);
	// }


	@HttpCode(200)
	@Put('status/:id')
	async updateStatus(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateRequestDto
	) {
		return this.requestService.updateStatus(id, dto)
	}


  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	update(
    @Param('id', IdValidationPipe) id: string, 
    @Body() dto: CreateRequestDto
  ) {
		return this.requestService.update(id, dto)
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	//   return this.requestService.remove(_id);
	// }
}
