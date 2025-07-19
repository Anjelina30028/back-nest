import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UpdateUserDto } from './dto/update-user.dto'
import { hash, genSalt } from 'bcryptjs'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}
	async byId(_id: string) {
		const user = await this.UserModel.findById(_id)
		if (!user) throw new NotFoundException('Такой пользователь не найден')

		return user
	}

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id)
		const isSameUser = await this.UserModel.findOne({ email: dto.email })
		if (isSameUser && String(_id) !== String(isSameUser._id))
			throw new NotFoundException('Данные email занят')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email

		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin
		}

		await user.save()
		return
	}
	async getCount() {
		return this.UserModel.find().count().exec()
	}

	async delete(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec()
	}

	async getAll(searchTerm?: string) {
		let options = {}
		if (searchTerm) {
			options = {
				$or: [{ email: new RegExp(searchTerm, 'i') }],
			}
		}
		return this.UserModel.find(options)
			.select('-password -updateAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}

	async findProjects() {
		const option = [
			{
				$lookup: {
					from: 'Project',
					localField: 'project',
					foreignField: '_id',
					as: 'UsPr',
				},
			},
		]
		const projects = await this.UserModel.aggregate(option)
		return projects
	}

	async manager() {
		const option = [
			{
				$match: {
					isAdmin: true,
				},
			},
		]
		const manager = await this.UserModel.aggregate(option)
		return manager
	}

	async updateRole(_id: string, dto: UpdateRoleDto){
		let updateDoc = await this.UserModel.findByIdAndUpdate(_id, dto).exec()
		return updateDoc
	}
}
