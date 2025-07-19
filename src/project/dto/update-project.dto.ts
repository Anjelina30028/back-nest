import { IsString } from 'class-validator';

export class UpdateProjectDto {

    @IsString()
    status: string
}
