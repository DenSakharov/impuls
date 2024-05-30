// Кожевников СЮ страница редактирования проекта

import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios ,{ AxiosResponse, AxiosError } from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import { tProjectAttributes } from '#/dtos';

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
export type EditProjectsModalProps = {
    projectsItem: tProjectAttributes;
    onClose: () => void;
    onSuccessCallback?: () => void;
}

const EditProjectsModal = ({ projectsItem, onClose, onSuccessCallback }: EditProjectsModalProps) => {
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
      setStatus(projectsItem.status || '');
      setName(projectsItem.name || '');
      setNotes(projectsItem.notes || '');
    }, [projectsItem])
    const handleSave = () => {
      setLoading(true);
      setError(null);
      axios.put(`http://${window.location.hostname}:3010/projects/${projectsItem.projectId}`, {
          status,
          name,
          notes,
      },
      {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response: AxiosResponse) => {
        onSuccessCallback && onSuccessCallback();
        onClose();
        
      }).catch((error: AxiosError) => {
        setError(error.message);        
      }).finally(() => {
        setLoading(false);          
      })
    };

return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
     <DialogTitle >Изменить проект</DialogTitle>
      <DialogContent >
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
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
        />
        <TextField
            label="Описание проекта"
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2 }}
        />
         <TextField
            label="UUID проекта"
            fullWidth
            value={projectsItem.projectId}
            sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button disabled={loading} onClick={handleSave} color={loading ? "secondary" : "primary" }>Сохранить</Button>
        {error !== null && <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)} message={error} />}
      </DialogActions>
      
    </Dialog>
);
};

export default EditProjectsModal;
