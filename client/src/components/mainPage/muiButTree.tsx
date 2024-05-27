// Кожевников СЮ кнопки управления деревом проектных данных

import React, { useState } from 'react';
import { IconButton, Stack, Container, Box } from '@mui/material';
import { Settings, Info, ContentCopy, Add, CreateNewFolder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAddDirectory from "./muiAddDirectory";
import MuiAddObject from "./muiAddObject";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MuiSidebarConf from './muiSidebarConf';

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

    <Box sx={{ flexGrow: 0}}>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 250}}>

         <Stack spacing={1} direction="row">
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddDirectory}>     <CreateNewFolderIcon fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddObject}>        <NoteAddIcon fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small">                                     <ContentCopy fontSize="small" /></IconButton>
            <IconButton edge='end' aria-label="delete" color='default' size="small">                            <DeleteIcon fontSize="small"/></IconButton>
            <IconButton aria-label="info" color='default' size="small">                                         <Info fontSize="small"/></IconButton>

            <MuiAddDirectory isOpen={isModalAddDirectoryOpen} onClose={closeModalAddDirectory} />
            <MuiAddObject isOpen={isModalAddObjectOpen} onClose={closeModalAddObject} />
            <MuiSidebarConf />

         </Stack>
        </Container>
    </Box>
    ); }

  export default MuiButTree;