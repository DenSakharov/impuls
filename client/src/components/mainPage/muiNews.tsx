import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Container, Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiNewsModal from "./muiNewsModal";
import './styles/muiNews.scss';

interface NewsItem {
    news_id: string;
    pubdate: string;
    title: string;
    content: string;
    userid: string | null;
}

const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength)
        return content;
    const truncated = content.substr(0, maxLength);
    return truncated.substr(0, truncated.lastIndexOf(' ')) + '...';
};

const MuiNews: React.FC = () => {
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalNews, setShowModalNews] = useState(false);
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 3; // Number of news items per page

    // load news list
    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch('http://localhost:3010/news');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNewsData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNewsData();
    }, []);

    // Get current news for the page
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // popup with sinlge news
    const handleOpenModalNews = (news: NewsItem) => {
        setSelectedNews(news);
        setShowModalNews(true);
    };

    const handleCloseModalNews = () => {
        setShowModalNews(false);
        setSelectedNews(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            {currentNews.map((news) => (
                <Card key={news.news_id} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {news.title}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {new Date(news.pubdate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {truncateContent(news.content, 30)}
                        </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="flex-end" padding="16px">
                        <Button onClick={() => handleOpenModalNews(news)}>Подробнее</Button>
                    </Box>
                </Card>
            ))}

            {/* Pagination buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" marginY="20px">
                <Box>
                    {Array.from({ length: Math.ceil(newsData.length / newsPerPage) }, (_, i) => (
                        <Button key={i + 1} onClick={() => paginate(i + 1)}>{i + 1}</Button>
                    ))}
                </Box>
                <Button variant="contained" color="primary" onClick={() => setShowModalCreate(true)}>+</Button>
            </Box>
            {showModalCreate && <MuiNewsModal onClose={() => setShowModalCreate(false)} />}

            <Modal open={showModalNews} onClose={handleCloseModalNews}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '80vh',
                    overflow: 'auto'
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModalNews}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    ><CloseIcon />
                    </IconButton>
                    {selectedNews && (
                        <>
                            <Typography variant="h6" component="h2">
                                {selectedNews.title}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {selectedNews.content}
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default MuiNews;
