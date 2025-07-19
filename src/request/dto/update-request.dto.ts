import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {

    @IsString()
    manager :string

    @IsBoolean()
    itNew: boolean

    @IsString()
    status: string;

}
