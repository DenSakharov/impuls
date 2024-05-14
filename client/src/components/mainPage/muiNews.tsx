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
    { date: '12.03.2024', title: 'Новые технологии внедряются постоянно', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
    { date: '02.01.2024', title: 'Как работает продвижение Альфа', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
    { date: '01.01.2024', title: 'Кто управляет системой изнутри?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' }
];

const MuiNews: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>Новости</Typography>
            {newsData.map((item, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>{item.date}</Typography>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography>{item.content}</Typography>
                    </CardContent>
                </Card>
            ))}
            <Box textAlign="right" mt={2}>
                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>+</Button>
            </Box>
            {showModal && <MuiNewsModal onClose={() => setShowModal(false)} />}
        </Container>
    );
};

export default MuiNews;