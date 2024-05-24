create table public.t_news
(
    news_id uuid not null
        constraint t_news_pk
            primary key,
    pubdate timestamp,
    title   varchar(1000),
    content text,
    userid  uuid
);

alter table public.t_news
    owner to "impulse-admin";

