import React from 'react';
import ListProjects from './listProjects';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import useProjects from '../../../hooks/useProjects';

interface AllProjectsModalProps
{
    onClose: () => void;
}

const MuiAllProjectsModal:  React.FC<AllProjectsModalProps> = ({onClose}) => {  
  const {projects, loading, error, reload} = useProjects();
  
  return (
  <Dialog open onClose={onClose} fullWidth maxWidth="sm">
   <DialogTitle>Список проектов</DialogTitle>
    <DialogContent>
      <Box sx={{ flexGrow: 0 }}>
        <div>
         {loading && <div>Loading...</div>}
         {!loading && !error && <ListProjects projects={projects} reload={reload}/>}
         {error && <div>Ошибка загрузки данных! Обратитесь в тех. поддержку</div>}
        </div>
     </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Закрыть</Button>
    </DialogActions >
  </Dialog>
  );
};
export default MuiAllProjectsModal;