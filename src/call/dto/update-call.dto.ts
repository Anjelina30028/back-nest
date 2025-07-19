import { PartialType } from '@nestjs/mapped-types';
import { CreateCallDto } from './create-call.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateCallDto extends PartialType(CreateCallDto) {

    @IsString()
    manager: string;

    @IsBoolean()
    itNew: boolean;

    @IsString()
    status: string
}
