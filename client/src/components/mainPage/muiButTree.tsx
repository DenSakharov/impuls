// Кожевников СЮ кнопки управления деревом проектных данных

import React, { useState } from 'react';
import { IconButton, Stack, Container, Box } from '@mui/material';
import { Settings, Info, ContentCopy, Add, CreateNewFolder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MuiAddDirectory from "./muiAddDirectory";
import MuiAddDocument from "./muiAddDocument";
import MuiAddObject from "./muiAddObject";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MuiSidebarConf from './muiSidebarConf';

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

    // addDocument
    const [isModalAddDocumentOpen, setModalAddDocumentOpen] = useState(false);
    const openModalAddDocument = () => setModalAddDocumentOpen(true);
    const closeModalAddDocument = () => setModalAddDocumentOpen(false);
    
    const treeUpdateHandler = (projectId?: string) => {
        projectId && updateTree && updateTree(projectId);
    }
    
    return (
    <Box sx={{ flexGrow: 0}}>
        <Container disableGutters sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'auto'}}>

         <Stack spacing={1} direction="row">
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddDirectory}>     <CreateNewFolderIcon fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddObject}>        <NoteAddIcon fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small" onClick={openModalAddDocument}>        <PostAddIcon fontSize="small"/></IconButton>
            {/* <IconButton aria-label="settings" color='default' size="small">                                     <ContentCopy fontSize="small" /></IconButton>
            <IconButton edge='end' aria-label="delete" color='default' size="small">                            <DeleteIcon fontSize="small"/></IconButton> */}
            <IconButton aria-label="info" color='default' size="small">                                         <Info fontSize="small"/></IconButton>

            <MuiAddDirectory projectId={projectId} isOpen={isModalAddDirectoryOpen} onClose={closeModalAddDirectory} onSuccessCallback={treeUpdateHandler}/>
            <MuiAddObject projectId={projectId} isOpen={isModalAddObjectOpen} onClose={closeModalAddObject} onSuccessCallback={treeUpdateHandler}/>
            <MuiAddDocument projectId={projectId} onSuccessCallback={treeUpdateHandler} isOpen={isModalAddDocumentOpen} onClose={closeModalAddDocument}/>
            <MuiSidebarConf />

         </Stack>
        </Container>
    </Box>
    ); }

  export default MuiButTree;