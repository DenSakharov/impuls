import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectsDto } from './create-projects.dto';

export class UpdateProjectsDto extends PartialType(CreateProjectsDto) {}
