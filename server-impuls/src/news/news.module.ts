import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './news.entity';

@Module({
    imports: [TypeOrmModule.forFeature([News])],
    controllers: [NewsController],
    providers: [NewsService],
})
export class NewsModule {}
