import React from 'react';
import { Button , ButtonGroup, TextField, InputAdornment, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

export default function ApprovalDialog ({formOpen, handleCloseForm, setApproveUser}: any){
    const approveUsers = React.useMemo(() => {return ['Красненков Илья', 'Кожевников Сергей', 'Жарков Андрей', 'Макшанова Алла']},[]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchUsers, setSearchUsers] = React.useState(approveUsers);
        


    React.useEffect(() => {
      if (searchQuery === "") {
        setSearchUsers(approveUsers);
        return;
      }
      setSearchUsers(approveUsers.filter((user: string) => user.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [searchQuery, approveUsers])

    return (
     <Dialog
        open={formOpen}
        onClose={handleCloseForm}
        PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();            
            handleCloseForm();
            setSearchQuery('');
        },
        }}
        >  
        <DialogTitle sx={{width:{md:300, xs:200}}}>Отправить на согласование</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{width: {md:300, xs:200}}} >
            Кому отправить на согласования
          </DialogContentText>
          <TextField sx={{height: 80, width: {md:300, xs:200}}} 
          size='small' 
          value={searchQuery} 
          onChange={(event) => {setSearchQuery(event.target.value)}}
          InputProps={{endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )}}>
            </TextField>
          <ButtonGroup sx={{display: 'flex', flexDirection: 'column'}} variant="text">
            {searchUsers.slice(0,10).map((user: string) => <Button sx={{width: {md:300, xs:200}, border: 1}}  key={user} type='submit' onClick={() => setApproveUser(user)}>{user}</Button>)}
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Отмена</Button>
        </DialogActions>
      </Dialog>
    )
}