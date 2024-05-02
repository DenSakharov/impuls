import React from 'react';
import { IconButton, Stack } from '@mui/material';
import { Settings, Info, ContentCopy, Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PostAddIcon from '@mui/icons-material/PostAdd';

function MuiButTree() {
    // const classes = useStyles()

    return (
        <Stack spacing={1} direction="row">
        <IconButton aria-label="settings" color='default' size="small" onClick={() => window.open('/popup', '_self')}> <CreateNewFolderIcon fontSize="small"/></IconButton>
        <IconButton aria-label="settings" color='default' size="small"> <PostAddIcon fontSize="small"/></IconButton>
        <IconButton aria-label="settings" color='default' size="small"> <ContentCopy fontSize="small" /></IconButton>
        <IconButton aria-label="delete" color='default' size="small">   <DeleteIcon fontSize="small"/></IconButton>
        <IconButton aria-label="info" color='default' size="small">     <Info fontSize="small"/></IconButton>
        <IconButton aria-label="settings" color='default' size="small"> <Settings fontSize="small"/></IconButton>
        </Stack>
    );
  }
   
  export default MuiButTree;