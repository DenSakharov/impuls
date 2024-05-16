import React, { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { Settings, Info, ContentCopy, Add, CreateNewFolder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAddDirectory from "./muiAddDirectory";
import MuiAddObject from "./muiAddObject";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MuiSidebar from './muiSidebar';

function MuiButTree() {
    // const classes = useStyles()

    // addDirectory
    const [isModalAddDirectoryOpen, setModalAddDirectoryOpen] = useState(false);
    const openModalAddDirectory = () => setModalAddDirectoryOpen(true);
    const closeModalAddDirectory = () => setModalAddDirectoryOpen(false);

    // addObject
    const [isModalAddObjectOpen, setModalAddObjectOpen] = useState(false);
    const openModalAddObject = () => setModalAddObjectOpen(true);
    const closeModalAddObject = () => setModalAddObjectOpen(false);

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

            <MuiAddDirectory isOpen={isModalAddDirectoryOpen} onClose={closeModalAddDirectory} />
            <MuiAddObject isOpen={isModalAddObjectOpen} onClose={closeModalAddObject} />
            <MuiSidebar />
        </Stack>
        
    );
  }

  export default MuiButTree;