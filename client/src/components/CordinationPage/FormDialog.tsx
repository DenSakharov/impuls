import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({handleOpen, handleClose, addCordinator, change}: any) {
  const [name, setName] = React.useState(''); 
  React.useEffect(()=>{
    //console.log(name)
    change(name) 
  }, [name]) 
  const changeName = (event:any) => {
    console.log(event.target.value);
    setName(event.target.value);

};
   return (
    <React.Fragment>
      <Dialog
        open={handleOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const Cordinator = formJson.addCordinator;
            console.log(Cordinator);
            handleClose();
          },
        }}
      >
        <DialogTitle>Форма добавления согласующего</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Выбирите и добавте согласующего документ
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Cordinator"
            label="Согласующий"
            onChange={changeName}
            type="string"
            fullWidth
            variant="standard"
          />
           <TextField
           autoFocus
            required
            margin="dense"
            id="name"
            name="Cordinator"
            label="Согласующий"
            onChange={changeName}
            type="string"
            fullWidth
            variant="standard"
           />
     
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}