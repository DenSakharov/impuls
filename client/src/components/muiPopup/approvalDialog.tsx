import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button , ButtonGroup, TextField } from '@mui/material';
import SuccessAlert from './successAlert';

export default function ApprovalDialog ({formOpen, handleCloseForm, setApproveUser}: any){
        const approveUsers = ['Красненков Илья', 'Кожевников Сергей', 'Жарков Андрей', 'Макшанова Алла']
    return (
     <Dialog
        open={formOpen}
        onClose={handleCloseForm}
        PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();            
            handleCloseForm();
        },
        }}
        >  
        <DialogTitle>Отправить на согласование</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Кому отправить на согласования
          </DialogContentText>
          <ButtonGroup sx={{display: 'flex', flexDirection: 'column'}} variant="outlined">
            {approveUsers.map((user: string) => <Button key={user} type='submit' onClick={() => setApproveUser(user)}>{user}</Button>)}
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Отмена</Button>
        </DialogActions>
      </Dialog>
    )
}