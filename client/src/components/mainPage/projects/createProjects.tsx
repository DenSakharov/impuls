// Кожевников СЮ страница создания нового проекта

import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';

interface AddProjectsModalProps
{
    // isOpen: boolean;
    onClose: () => void;
}

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

const AddProjectsModal: React.FC<AddProjectsModalProps> = ({onClose}) => {
    const [name, setTitle] = useState('');
    const [notes, setContent] = useState('');
    const [status, setStatus] = useState('');

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
        {/* <TextField
            label="Статус проекта"
            margin="dense"
            type="text"    
            fullWidth
            value={'Draft'}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mb: 2 }}
        /> */}

        {/* <label htmlFor="type">Статус проекта</label>
        <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>                          
                        <option value="1">Draft</option>
                        <option value="2">Ready</option>
                        <option value="3">InWork</option>
                        <option value="3">Close</option>
                        <option value="4">Hold</option>
        </select> */}

        <TextField
          id="projects-select-status"
          select
          label="Статус проекта"
          margin="dense"
          onChange={(e) => setStatus(e.target.value)}
          defaultValue="Test"
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
            helperText="Укажите название проекта (до 10 символов) "
        />
        <TextField
            label="Описание проекта"
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
            helperText="Введите описание проекта"
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

        <Button onClick={handleSubmit} color="primary">Создать</Button>        
        <Snackbar
            open={openSnackbarSuccess}
            autoHideDuration={5000}            
            onClose={handleClose}
            message="Создан новый проект"
        />

    </DialogActions>
</Dialog>

);

};

export default AddProjectsModal;

