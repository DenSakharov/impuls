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
    const [name, setTitle] = useState('');
    const [notes, setContent] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async () => {
        const data = {
            name,
            notes,
            status,
        };

        try {
            const response = await fetch(`http://${window.location.hostname.toString()}:3010/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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

// useEffect(() => {
//     console.log(name)
//     console.log(notes)
//     console.log(status)
//     setTitle('');
//     setContent('');
//     setStatus('');
// }, [name, notes, status]);

return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Содать проект</DialogTitle>
    <DialogContent>
        <TextField
            label=""
            type="status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

