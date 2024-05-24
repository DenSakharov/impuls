import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateNewsDto {
    @IsDateString()
    pubdate: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsUUID()
    @IsOptional()
    userid?: string | null;
}
