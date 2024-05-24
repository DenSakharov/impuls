import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const MuiNewsModal2 = ({ open, newsItem, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (newsItem) {
            setTitle(newsItem.title);
            setContent(newsItem.content);
        }
    }, [newsItem]);

    const handleSave = async () => {
        await axios.patch(`http://${window.location.hostname.toString()}:3010/news/${newsItem.news_id}`, {
            title,
            content,
        });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                <TextField
                    label="Заголовок"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"/>
                <TextField
                    label="Текст"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"/>
                <Button variant="contained" onClick={handleSave}>
                   Сохранить
                </Button>
            </Box>
        </Modal>
    );
};

export default MuiNewsModal2;
