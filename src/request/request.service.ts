import { Body, Injectable, NotFoundException } from '@nestjs/common'
import { CreateRequestDto } from './dto/create-request.dto'
import { UpdateRequestDto } from './dto/update-request.dto'
import { InjectModel } from 'nestjs-typegoose'
import { RequestModel } from './request.model'
import { ModelType } from '@typegoose/typegoose/lib/types'

@Injectable()
export class RequestService {
	constructor(
		@InjectModel(RequestModel)
		private readonly RequestModel: ModelType<RequestModel>
	) {}

	async create() {
		const defaultValue: CreateRequestDto = {
			name: '',
			phone: '',
			message: '',
			manager: '',
			status: ''
		}
		const request = await this.RequestModel.create(defaultValue)
		return request._id
	}

	async update(_id: string, dto: CreateRequestDto) {
    const request = await this.RequestModel.findById(_id)

		const updateDoc = await this.RequestModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) throw new NotFoundException('Запрос не найден')

		return updateDoc
	}

	findAll(searchTerm?: string) {
    let options = {}
		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						phone: new RegExp(searchTerm, 'i'),
					}
				],
			}
		}
		return this.RequestModel.find(options)
			.select('-updateAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	async findNew (searchTerm?: string){
		let options = {
			itNew: true,
			$or: [
				{
					name: new RegExp(searchTerm, 'i'),
				},
				{
					phone: new RegExp(searchTerm, 'i'),
				}
			],
		}
		let response = await this.RequestModel.find(options).exec()
		return response 

	}

	async findOld (_id: string,searchTerm?: string){
		let options = {
			itNew: false,
			manager: _id,
			$or: [
				{
					name: new RegExp(searchTerm, 'i'),
				},
				{
					phone: new RegExp(searchTerm, 'i'),
				}
			],
		}
		let response = await this.RequestModel.find(options).exec()
		return response

	}

	findOne(id: number) {
		return `This action returns a #${id} request`
	}

	remove(id: number) {
		return `This action removes a #${id} request`
	}

	async updateStatus(_id: string, dto: UpdateRequestDto){
		const updateDoc = await this.RequestModel.findByIdAndUpdate(_id, dto).exec()
		return updateDoc
	}
}
