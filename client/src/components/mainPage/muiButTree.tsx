import React, { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { Settings, Info, ContentCopy, Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAddDirectory from "../muiPopup/muiAddDirectory";

function MuiButTree() {
    // const classes = useStyles()

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <Stack spacing={1} direction="row">
            <IconButton aria-label="settings" color='default' size="small" onClick={openModal}><Add fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small"><ContentCopy fontSize="small" /></IconButton>
            <IconButton edge='end' aria-label="delete" color='default' size="small"> <DeleteIcon fontSize="small"/></IconButton>
            <IconButton aria-label="info" color='default' size="small"><Info fontSize="small"/></IconButton>
            <IconButton aria-label="settings" color='default' size="small"><Settings fontSize="small"/></IconButton>
            <MuiAddDirectory isOpen={isModalOpen} onClose={closeModal} />
        </Stack>
    );
  }
   
  export default MuiButTree;