import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export interface CallModel extends Base{}

export class CallModel extends TimeStamps{
    @prop()
    name :string

    @prop()
    phone :string

    @prop()
    manager :string

    @prop()
    itNew: boolean

    @prop()
    status: string

    @prop()
    result: string
}



