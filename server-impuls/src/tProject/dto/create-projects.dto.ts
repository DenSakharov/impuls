import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateProjectsDto {
    @IsDateString()
    status: string;

    @IsString()
    name: string;

    @IsString()
    notes: string;

    @IsUUID()
    @IsOptional()
    userid?: string | null;
}
