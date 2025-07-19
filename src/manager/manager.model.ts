import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface ManagerModel extends Base {}

export class ManagerModel extends TimeStamps {
	@prop()
	name: string

	@prop({ unique: true })
	email: string

	@prop()
	password: string

}

