// Кожевников СЮ страница редактирования проекта

import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const EditProjectsModal = ({ open, projectsItem, onClose }) => {
    const [name, setTitle] = useState('');
    const [notes, setContent] = useState('');

    useEffect(() => {
        if (projectsItem) {
            setTitle(projectsItem.name);
            setContent(projectsItem.notes);
        }
    }, [projectsItem]);

    const handleSave = async () => {
        await axios.patch(`http://${window.location.hostname.toString()}:3010/projects/${projectsItem.projectId}`, {
            name,
            notes,
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
                    label="Название проекта"
                    fullWidth
                    value={name}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"/>
                <TextField
                    label="Описание проекта"
                    fullWidth
                    multiline
                    rows={4}
                    value={notes}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"/>
                <Button variant="contained" onClick={handleSave}>
                   Сохранить
                </Button>
            </Box>
        </Modal>
    );
};

export default EditProjectsModal;
