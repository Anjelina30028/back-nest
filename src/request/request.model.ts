import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export interface RequestModel extends Base{}

export class RequestModel extends TimeStamps{
    @prop()
    name :string

    @prop()
    phone :string

    @prop()
    message: string

    @prop()
    manager :string

    @prop()
    itNew: boolean

    @prop()
    status: string
}


