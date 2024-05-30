// Кожевников СЮ выбор проекта на StartPage

import React from 'react';
import Box from '@mui/material/Box';
import { Button} from '@mui/material';
import ProjectDialog from './muiDialog';

export default function SelectProjectsNew({projects, changeState} : any) {

    const [formOpen, setFormOpen] = React.useState(false);
    const handleCloseForm = () => {
          setFormOpen(false);
      }
      const handleOpenForm = () => {
          setFormOpen(true);
      }
      const changeProps = (value : any) => {
        changeState(value)
        handleCloseForm()
      }
  return (

    <Box sx={{ flexGrow: 0 }}>
        <div><Button variant="text" onClick={handleOpenForm}  > Открыть проект</Button></div>
        <div><Button variant="text"  > Настроить проекты</Button></div>
        <ProjectDialog projects={projects} formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>
    </Box>
  );
}
