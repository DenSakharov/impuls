import React, { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { Info, ContentCopy } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAddDirectory from "./muiAddDirectory";
import MuiAddObject from "./muiAddObject";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MuiSidebarConf from './muiSidebarConf';
import { tPackageAttributes } from '#/dtos/tPackageAttributes';
import axios from 'axios';
import { tObjectAttributes } from '#/dtos/tObjectAttributes';

function MuiButTree({ projectId, updateTree } : {projectId?: string, updateTree?: (string)=>void}) {
    // const classes = useStyles()

    // addDirectory
    const [isModalAddDirectoryOpen, setModalAddDirectoryOpen] = useState(false);
    const openModalAddDirectory = () => setModalAddDirectoryOpen(true);
    const closeModalAddDirectory = () => setModalAddDirectoryOpen(false);

    // addObject
    const [isModalAddObjectOpen, setModalAddObjectOpen] = useState(false);
    const openModalAddObject = () => setModalAddObjectOpen(true);
    const closeModalAddObject = () => setModalAddObjectOpen(false);

    const addDirectory = (newPackage: tPackageAttributes) => {
        axios.post(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/packages`, newPackage, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            closeModalAddDirectory();
            updateTree && updateTree(projectId);
        }).catch((error) => {
            console.log(error);
        });
    }
    const addObject = (newObject: tObjectAttributes) => {
        console.log(newObject);
        
        axios.post(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/objects`, newObject, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            closeModalAddObject();
            updateTree && updateTree(projectId);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <Stack spacing={1} direction="row">
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddDirectory}>     <CreateNewFolderIcon fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddObject}>        <NoteAddIcon fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small">                                     <ContentCopy fontSize="small" /></IconButton>
            <IconButton edge='end' aria-label="delete" color='default' size="small">                            <DeleteIcon fontSize="small"/></IconButton>
            <IconButton aria-label="info" color='default' size="small">                                         <Info fontSize="small"/></IconButton>
            {/* <IconButton aria-label="settings" color='default' size="small">                                     <Settings fontSize="small"/></IconButton> */}

            {/* <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddDirectory}><CreateNewFolder fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddObject}><Add fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small"><ContentCopy fontSize="small" /></IconButton>
            <IconButton edge='end' aria-label="delete" color='default' size="small"> <DeleteIcon fontSize="small"/></IconButton>
            <IconButton aria-label="info" color='default' size="small"><Info fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small"><Settings fontSize="small"/></IconButton> */}

            <MuiAddDirectory projectId={projectId} isOpen={isModalAddDirectoryOpen} onClose={closeModalAddDirectory} onSubmit={addDirectory}/>
            <MuiAddObject projectId={projectId} isOpen={isModalAddObjectOpen} onClose={closeModalAddObject} onSubmit={addObject}/>
            <MuiSidebarConf />
        </Stack>
        
    );
  }

  export default MuiButTree;