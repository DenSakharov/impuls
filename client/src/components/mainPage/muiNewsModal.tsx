import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Typography } from '@mui/material';

interface AddNewsModalProps {
    onClose: () => void;
}

const MuiNewsModal: React.FC<AddNewsModalProps> = ({ onClose }) => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    };

    const handleSubmit = () => {
        console.log({ date, title, content, file });
        onClose();
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Добавление новости</DialogTitle>
            <DialogContent>
                <TextField
                    label=""
                    type="date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Заголовок"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Текст новости"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    component="label"
                >
                    Загрузить изображение
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={onClose} color="primary">Добавить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MuiNewsModal;