import { Injectable, NotFoundException, Param, Patch } from '@nestjs/common'
import { CreateCallDto } from './dto/create-call.dto'
import { UpdateCallDto } from './dto/update-call.dto'
import { CallModel } from './call.model'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { LastCallDto } from './dto/last-call.dto'

@Injectable()
export class CallService {
	constructor(
		@InjectModel(CallModel) private readonly CallModel: ModelType<CallModel>
	) {}

	async create() {
		const defaultValue: CreateCallDto = {
			name: '',
			phone: '',
			manager: '',
			itNew: true,
			status: '',
		}
		const call = await this.CallModel.create(defaultValue)
		return call._id
	}

	@Patch(':id')
	async update(@Param('id') _id: string, dto: CreateCallDto) {
		const updateDoc = await this.CallModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) throw new NotFoundException('Звонок не найден')
		return updateDoc
	}

	async updateManager(_id: string, dto: UpdateCallDto) {
		const updateDoc = await this.CallModel.findByIdAndUpdate(_id, dto).exec()
		return updateDoc
	}

	async updateLast(_id: string, dto: LastCallDto) {
		const updateDoc = await this.CallModel.findByIdAndUpdate(_id, dto).exec()
		return updateDoc
	}

	async findALlAnswer() {
		let options = {}
		options = {
			itNew: false,
			status: "Потом перезвонить",
		}
		let response = await this.CallModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
		return response
	}

	async findAllNew(searchTerm?: string) {
		let options = {}
		options = {
			status: "Необходимо позвонить",
			$or: [
				{
					name: new RegExp(searchTerm, 'i'),
				},
				{
					phone: new RegExp(searchTerm, 'i'),
				},
			],
		}
		let response = await this.CallModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
		return response
	}

	async findAllOld(id, searchTerm?: string) {
		let options = {}
			options = {
				manager: id,
				status: "Ответственный назначен",
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						phone: new RegExp(searchTerm, 'i'),
					},
				],
			}
		return this.CallModel.find(options)
			.select('-updateAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	findOne(id: number) {
		return `This action returns a #${id} call`
	}

	remove(id: number) {
		return `This action removes a #${id} call`
	}

	async updateStatus(_id: string, dto: UpdateCallDto) {
		const updateDoc = await this.CallModel.findByIdAndUpdate(_id, dto).exec()
		return updateDoc
	}
}
