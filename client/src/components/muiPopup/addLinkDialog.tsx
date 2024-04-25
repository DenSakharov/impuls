import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button , TextField } from '@mui/material';

export default function AddLinkDialog ({formOpen, handleCloseForm, addLinks}: any){
    
    return (
     <Dialog
        open={formOpen}
        onClose={handleCloseForm}
        PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const link = formJson.link;
            console.log(link);
            addLinks(link);
            handleCloseForm();
        },
        }}
        >  
        <DialogTitle>Редактирование ссылок</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Какую ссылку вы хотите добавить?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="link"
            label="Ссылка"
            type="string"
            defaultValue={'https://'}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Отмена</Button>
          <Button type="submit">Подтвердить</Button>
        </DialogActions>
      </Dialog>
    )
}