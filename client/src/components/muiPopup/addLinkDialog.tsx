import React from 'react';
import { Button , Dialog ,TextField, DialogActions, DialogContent, DialogContentText,DialogTitle } from '@mui/material';

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