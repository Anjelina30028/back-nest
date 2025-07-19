import { IsString } from "class-validator";

export class CreateRequestDto {
    @IsString()
    name :string

    @IsString()
    phone :string

    @IsString()
    message: string
    
    @IsString()
    manager :string

    @IsString()
    status :string

}
