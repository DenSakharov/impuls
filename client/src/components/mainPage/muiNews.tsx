import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography, Container, Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiNewsModal from "./muiNewsModal";
import MuiNewsModalUpdate from "./muiNewsModalUpdate";
import './styles/muiNews.scss';
import axios from 'axios';

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
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [currentNewsUpdate, setCurrentNewsUpdate] = useState(null);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalItem, setShowModalItem] = useState(false);
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 3; // Number of news items per page

    // loa news list
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

    // load news list
    useEffect(() => {
        fetchNewsData();
    }, []);

    // Get current news for the page
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // edit/delete news
    const handleNewsEditClick = (newsItem) => {
        setCurrentNewsUpdate(newsItem);
        setShowModalUpdate(true);
    };

    const handleNewsDeleteClick = async (newsId) => {
        await axios.delete(`http://localhost:3010/news/${newsId}`);
        fetchNewsData();
    };

    // popup with sinlge news
    const handleOpenModalNews = (news: NewsItem) => {
        setSelectedNews(news);
        setShowModalItem(true);
    };

    const handleCloseModalNews = () => {
        setShowModalItem(false);
        setSelectedNews(null);
    };

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setCurrentNewsUpdate(null);
        fetchNewsData();
    };

    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        fetchNewsData();
    };

    // load news
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
                    <CardActions style={{ marginBottom: '-50px' }}>
                        <IconButton
                            aria-label="edit"
                            onClick={() => handleNewsEditClick(news)}
                            style={{ marginLeft: 'auto' }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleNewsDeleteClick(news.news_id)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {news.title}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {new Date(news.pubdate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {truncateContent(news.content, 200)}
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
            {showModalCreate && <MuiNewsModal onClose={handleCloseModalCreate} />}
            {showModalUpdate && <MuiNewsModalUpdate open={showModalUpdate} newsItem={currentNewsUpdate} onClose={handleCloseModalUpdate} />}

            <Modal open={showModalItem} onClose={handleCloseModalNews}>
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
