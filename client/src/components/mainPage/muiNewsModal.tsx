import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface AddNewsModalProps {
    onClose: () => void;
}

const MuiNewsModal: React.FC<AddNewsModalProps> = ({ onClose }) => {

    const [pubdate, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    //const [file, setFile] = useState<File | null>(null);
/*
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    };
*/
    const handleSubmit = async () => {

        const data = {
            pubdate,
            title,
            content,
            // file: file ? await convertFileToBase64(file) : null, // Закомментируйте если файл не нужен
        };

        try {
            const response = await fetch(`http://${window.location.hostname.toString()}:3010/news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // handle success, e.g., clear form, show success message, etc.
            onClose();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // handle error, e.g., show error message, etc.
        }
    };

    // Уберите функцию convertFileToBase64 если файл не нужен
    // const convertFileToBase64 = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result as string);
    //         reader.onerror = (error) => reject(error);
    //     });
    // };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Добавление новости</DialogTitle>
            <DialogContent>
                <TextField
                    label=""
                    type="date"
                    fullWidth
                    value={pubdate}
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
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    component="label"*/}
                {/*>*/}
                {/*    Загрузить изображение*/}
                {/*    <input*/}
                {/*        type="file"*/}
                {/*        hidden*/}
                {/*        onChange={handleFileChange}*/}
                {/*    />*/}
                {/*</Button>*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} color="primary">Добавить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MuiNewsModal;