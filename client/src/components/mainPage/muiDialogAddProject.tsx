import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import data from '../editPopup/data';
import { Container } from '@mui/material';

export default function AddProjectDialog({formOpen, handleCloseForm, changeProps}: any) {
  return (
    <>
      <Dialog
        open={formOpen}
        onClose={handleCloseForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Выберите проект"}
        </DialogTitle>
        <DialogContent>
          <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 300}}>
          {data.tree.map((item: any) => (
            <Button key={item.name} onClick={() => changeProps(item)}>{item.name}</Button>
          ))}
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
}