import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from "axios";
import ListProjects from './listProjects';
import Box from '@mui/material/Box';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface AllProjectsModalProps
{
    onClose: () => void;
}

const MuiAllProjectsModal:  React.FC<AllProjectsModalProps> = ({onClose}) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = () => {
     axios
       .get(`http://${window.location.hostname}:3010/projects`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
       .then((response) => {
        setIsLoading(false);
        setNotes(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Список проектов</DialogTitle>
    <DialogContent>

    <Box sx={{ flexGrow: 0, width: 1000 }}>
    <div>      
      {notes && <ListProjects data={notes} />}
      {isError && <div>Error fetching data.</div>}
    </div>
    </Box>

    </DialogContent>

    <DialogActions>
        <Button>Закрыть</Button>     
        <Button color="primary"> Создать </Button>      

    </DialogActions>
</Dialog>


  );
};
export default MuiAllProjectsModal;