import { IsBoolean, IsString } from "class-validator";

export class CreateCallDto {

@IsString()
name: string

@IsString()
phone: string

@IsString()
manager: string

@IsBoolean()
itNew: boolean

@IsString()
status: string
}
