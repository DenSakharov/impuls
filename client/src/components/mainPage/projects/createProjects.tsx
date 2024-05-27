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

    // const [state, setState] = useState({
    //     modules: '',
    //     logtype: '',
    //     author: '',
    //     notes_log: '',
    //     datetime: '',
    // });
    // const [id, setId] = useState('');
    // const [modules, setModules] = useState('');
    // const [logtype, setLogtype] = useState('');
    // const [author, setAuthor] = useState('');
    // const [notes_log, setNotes_log] = useState('');
    // const [datetime, setDatetime] = useState('');

    const handleSubmit = async () => {
        const data = {
            name,
            notes,
            status,
        };
        const syslog = {
            // id:'',
            modules: 'Projects',
            logtype: 'OK',
            author: localStorage.getItem('userlogin'),
            notes: 'Add project',
            actions: 'OK:Create new project',
            // datetime: '',
        };

        // создание проекта
        try {
            const response = await fetch(`http://${window.location.hostname.toString()}:3010/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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

        // запись системного лога о событии
        try {
            const response = await fetch(`http://${window.location.hostname.toString()}:3010/history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(syslog),
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


                // setId({id});
                // setModules({modules});
                // setLogtype({logtype});
                // setAuthor({author});
                // setNotes_log({notes_log});
                // setDatetime({datetime});


);

};

export default AddProjectsModal;

