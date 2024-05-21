import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('t_news')
export class News {
    @PrimaryGeneratedColumn('uuid')
    news_id: string;

    @Column({ type: 'timestamp' })
    pubdate: Date;

    @Column({ type: 'varchar', length: 1000 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'uuid', nullable: true })
    userid: string | null;
}
