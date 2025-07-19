import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { ProjectModel } from './project.model'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { from } from 'rxjs'

@Injectable()
export class ProjectService {
	constructor(
		@InjectModel(ProjectModel)
		private readonly ProjectModel: ModelType<ProjectModel>
	) {}

	async create() {
		const defaultValue: CreateProjectDto = {
			name: '',
			description: '',
			manager: '',
			status: '',
		}
		const project = await this.ProjectModel.create(defaultValue)
		return project._id
	}

	async update(_id: string, dto: CreateProjectDto) {
		const updateDoc = await this.ProjectModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
		if (!updateDoc) throw new NotFoundException('Проект не найден')
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
						description: new RegExp(searchTerm, 'i'),
					},
					{
						project: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}
		return this.ProjectModel.find(options)
			.select('-updateAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.exec()
	}



	// findOne(id: number) {
	// 	return `This action returns a #${id} project`
	// }

	async byId(_id: string) {
		const project = await this.ProjectModel.findById(_id)
		if (!project) throw new NotFoundException('Такой проект не найден')
		return project
	}

	async remove(_id: string) {
		const deleteDoc = await this.ProjectModel.findByIdAndDelete(_id).exec()
		if (!deleteDoc) throw new NotFoundException('Проект не найден')
		return deleteDoc
	}

	async updateStatus(_id: string, dto:UpdateProjectDto){
		const updateDoc = await this.ProjectModel.findByIdAndUpdate(_id, dto).exec()
		return updateDoc
	}
}
