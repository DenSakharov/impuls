// Кожевников СЮ страница создания проекта

import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface AddProjectsModalProps
{
    // isOpen: boolean;
    onClose: () => void;
}

// Поля таблицы t_project
    // projectId: UUID
    // name: string
    // notes: string
    // status: string
    // imsGuid: string
    // dateEdited: Date
    // dateCreated: Date


const AddProjectsModal: React.FC<AddProjectsModalProps> = ({ onClose }) => {
    const [dateCreated, setDate] = useState('');
    const [name, setTitle] = useState('');
    const [notes, setContent] = useState('');

    const handleSubmit = async () => {

        const data = {
            dateCreated,
            name,
            notes,
        };

        try {
            const response = await fetch(`http://${window.location.hostname.toString()}:3010/projects`, {
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


return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Содать проект</DialogTitle>
    <DialogContent>
        <TextField
            label=""
            type="date"
            fullWidth
            value={dateCreated}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 2 }}
        />
        <TextField
            label="Название проекта"
            fullWidth
            value={name}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
        />
        <TextField
            label="Описание проекта"
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
        />

    </DialogContent>
    <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} color="primary">Создать</Button>
    </DialogActions>
</Dialog>

);

};

export default AddProjectsModal;

