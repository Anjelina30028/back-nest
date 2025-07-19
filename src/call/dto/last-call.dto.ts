import { IsString } from "class-validator";

export class LastCallDto{
    @IsString()
    result: string

    @IsString()
    status: string
}