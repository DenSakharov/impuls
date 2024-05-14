import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Container, Box } from '@mui/material';
import MuiNewsModal from "./muiNewsModal";
import './styles/muiNews.scss';

interface NewsItem {
    date: string;
    title: string;
    content: string;
}

const newsData: NewsItem[] = [
    { date: '14.04.2024', title: 'Новые функции автоматизации в CRM', content: 'Инновации для управления документами: как они могут улучшить ваш рабочий процесс...' },
    { date: '10.04.2024', title: 'Обновление системы', content: 'Улучшенная интеграция CRM с облачными хранилищами для оптимизации документооборота ...' },
    { date: '18.03.2024', title: 'Интересное исследование', content: 'Исследование показывает, как эффективное управление документами повышает производительность на 40%' },
    { date: '15.03.2024', title: 'Три ключевые стратегии безопасности для вашей CRM-системы', content: 'Защитите свои документы от утечек данных ...' },
    { date: '12.11.2023', title: 'Инновации на каждом шагу', content: 'Как наша CRM помогает соблюдать GDPR при обработке документов: Практическое руководство...' },
    { date: '11.11.2024', title: 'Пять лучших практик', content: 'Идеи для эффективной классификации и управления корпоративными документами в CRM...' },
    { date: '12.10.2023', title: 'Самое главное', content: 'Оптимизация управления контрактами через обновленные функции нашей CRM...' },
    { date: '15.09.2024', title: 'Новый модуль управления документами', content: 'Превращаем бумажный архив в цифровую фортецу...' },
    { date: '12.09.2023', title: 'Интеграция искусственного интеллекта в CRM', content: 'Инновации для автоматической сортировки и анализа документов...' },
];

const MuiNews: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 3; // Количество новостей на странице

    // Получаем текущие новости для страницы
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

    // Обработчик изменения страницы
    const numPages = Math.ceil(newsData.length / newsPerPage);
    const pageNumbers = Array.from({ length: numPages }, (_, i) => i + 1);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Новости</Typography>
            {currentNews.map((item, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>{item.date}</Typography>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography>{item.content}</Typography>
                    </CardContent>
                </Card>
            ))}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Box>
                    {pageNumbers.map(number => (
                        <Button key={number} variant="text" color="primary" onClick={() => setCurrentPage(number)} sx={{ mx: 0.5 }}>
                            {number}
                        </Button>
                    ))}
                </Box>
                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>+</Button>
            </Box>
            {showModal && <MuiNewsModal onClose={() => setShowModal(false)} />}
        </Container>
    );
};

export default MuiNews;