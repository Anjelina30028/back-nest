import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common'
import { Types } from 'mongoose'

export class IdValidationPipe implements PipeTransform {
	transform(value: any, meta: ArgumentMetadata) {
		if (meta.type !== 'param') return value
		if (!Types.ObjectId.isValid(value))
			throw new BadRequestException('Неправильный формат id')
		return value
	}
}
