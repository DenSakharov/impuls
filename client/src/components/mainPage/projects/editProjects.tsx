// Кожевников СЮ страница редактирования проекта

import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios ,{ AxiosResponse, AxiosError } from 'axios';
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

const EditProjectsModal = ({ open,  projectsItem, onClose }) => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [select, setSelection] = React.useState([]);

    const [projectId, setProjectId] = useState('');
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [notes, setContent] = useState('');

    function getProjects() {
      let url_getProject = `http://${window.location.hostname.toString()}:3010/projects/`+ projectId
      axios({
        method: 'get',
        url: url_getProject,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}
      }).then((response: AxiosResponse) => {

        var dataProject = response.data
        setProjectId(dataProject.projectId)
        setStatus(dataProject.status)
        setName(dataProject.name)
        setContent(dataProject.notes)
      }).catch((reason: AxiosError) => {
        console.log(reason)
      })
    }


    useEffect(() => {
      let userReceived = false
      if (!userReceived) {
        getProjects()
      }
      return () => { userReceived = true; }
    },[]);

    // useEffect(() => {
    //   console.log(projectsItem.projectId)

    //     if (projectsItem) {
    //         setProjectId(projectsItem.projectId);
    //         setStatus(projectsItem.status);
    //         setTitle(projectsItem.name);
    //         setContent(projectsItem.notes);

    //     }
    // }, [projectsItem]);

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
          value ={projectsItem.status}
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
            value={projectsItem.name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
        />
        <TextField
            label="Описание проекта"
            fullWidth
            multiline
            rows={4}
            value={projectsItem.notes}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
        />
         <TextField
            label="UUID проекта"
            fullWidth
            multiline
            rows={4}
            value={projectsItem.projectId}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
        />

      </DialogContent>
     <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} color="primary">Сохранить</Button>
     </DialogActions>
    </Dialog>
);
};

export default EditProjectsModal;
