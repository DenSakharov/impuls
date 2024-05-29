// Кожевников СЮ страница редактирования проекта

import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';


const currencies = [
    {
      value: 'Draft',
      label: 'Черновик',
    },
    {
      value: 'Preparation',
      label: 'Подготовка',
    },    
    {
        value: 'InWork',
        label: 'В работе',
    },
    {
        value: 'Ready',
        label: 'Выполнен',
    },
    {
      value: 'Hold',
      label: 'Приостановлен',
    },
    {
      value: 'Test',
      label: 'Тестовый'
    },  
  ];

const EditProjectsModal = ({ open, projectsItem, onClose }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [status, setStatus] = useState('');
    const [name, setTitle] = useState('');
    const [notes, setContent] = useState('');

    useEffect(() => {        
        if (projectsItem) {
            setStatus(projectsItem.status);
            setTitle(projectsItem.name);
            setContent(projectsItem.notes);
            
        }
    }, [projectsItem]);

    // const response = await fetch(`http://${window.location.hostname.toString()}:3010/projects/${projectsItem.projectId}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //             body: JSON.stringify(data),
    //         };

    const handleSave = async () => {
        try {
        await axios.patch(`http://${window.location.hostname.toString()}:3010/projects/${projectsItem.projectId}`, {
            status,
            name,
            notes,
        });
        onClose();
        
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
        const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false)
        const [openSnackbarError, setOpenSnackbarError] = useState(false)

        const handleClickSuccess = () => {        
            setOpenSnackbarSuccess(true);        
        };
        const handleClickError = () => {        
            setOpenSnackbarError(true);        
        };

        const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
            return;
            }
            setOpenSnackbarSuccess(false)
            setOpenSnackbarError(false)
        };

return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle >Изменить проект</DialogTitle>
    <DialogContent >
        {/* <TextField
            label="Статус проекта"
            margin="dense"
            type="text"            
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 2 }}
        /> */}

        <TextField
          id="projects-select-status"
          focused
          select
          label="Статус проекта"
          margin="dense"
          onChange={(e) => setStatus(e.target.value)}
          value ={status}
          helperText="Укажите cтатус проекта"
          sx={{ mb: 2 }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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
        <Snackbar
            open={openSnackbarError}
            autoHideDuration={5000}                        
            onClose={handleClose}
            message="Создание нового проекта отменено"  
        />

        <Button onClick={handleSave} color="primary">Сохранить</Button>        
        <Snackbar
            open={openSnackbarSuccess}
            autoHideDuration={5000}            
            onClose={handleClose}
            message="Создан новый проект"
        />

    </DialogActions>
</Dialog>


        // <Modal
        //     open={open}
        //     onClose={onClose}
        //     aria-labelledby="modal-modal-title"
        //     aria-describedby="modal-modal-description">
        //     <Box
        //         sx={{
        //             position: 'absolute',
        //             top: '50%',
        //             left: '50%',
        //             transform: 'translate(-50%, -50%)',
        //             width: 400,
        //             bgcolor: 'background.paper',
        //             boxShadow: 24,
        //             p: 4,
        //         }}>
        //         <TextField
        //             label="Название проекта"
        //             fullWidth
        //             value={name}
        //             onChange={(e) => setTitle(e.target.value)}
        //             margin="normal"/>
        //         <TextField
        //             label="Описание проекта"
        //             fullWidth
        //             multiline
        //             rows={4}
        //             value={notes}
        //             onChange={(e) => setContent(e.target.value)}
        //             margin="normal"/>
        //         <Button variant="contained" onClick={handleSave}>
        //            Сохранить
        //         </Button>
        //     </Box>
        // </Modal>
    );
};

export default EditProjectsModal;
