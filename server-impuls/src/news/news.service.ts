import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
    ) {}

    findAll(): Promise<News[]> {
        return this.newsRepository.find();
    }

    findOne(id: string): Promise<News> {
        return this.newsRepository.findOne({ where: { news_id: id } });
    }

    create(createNewsDto: CreateNewsDto): Promise<News> {
        const news = this.newsRepository.create(createNewsDto);
        return this.newsRepository.save(news);
    }

    async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        await this.newsRepository.update(id, updateNewsDto);
        return this.newsRepository.findOne({ where: { news_id: id } });
    }

    async remove(id: string): Promise<void> {
        await this.newsRepository.delete(id);
    }
}
