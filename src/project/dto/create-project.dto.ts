import { IsString } from "class-validator";

export class CreateProjectDto {

@IsString()
name: string;

@IsString()
description: string;

@IsString()
manager: string

@IsString()
status: string
}
