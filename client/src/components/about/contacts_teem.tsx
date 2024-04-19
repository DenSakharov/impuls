import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

function Contacts_teem() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

    <Button
      id="fade-button"
       aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickOpen}>
      Наша команда
    </Button>

    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
      Команда проекта
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
      <Typography gutterBottom>
      <Typography>Денис Сахаров – TeamLead</Typography>
      <Typography>Жарков Андрей</Typography>
      <Typography>Красненков Илья</Typography>
      <Typography>Кожевников Сергей</Typography>
      <Typography>Макшанова Алла</Typography>
      <Typography>Пихтовников Владимир</Typography>
      <Typography>Фёдоров Роман</Typography>
      <Typography>Иконников Михаил</Typography>
      </Typography>

      </DialogContent>


      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Инвестировать на развитие проекта ;)
        </Button>
    </DialogActions>
    </BootstrapDialog>
  </React.Fragment>
  );
}

export default Contacts_teem;
