import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface ProjectModel extends Base{}

export class ProjectModel extends TimeStamps{

@prop()
name: string;

@prop()
description: string;

@prop()
manager: string;

@prop()
status: string;
}

