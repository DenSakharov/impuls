// Кожевников СЮ выбор проекта на StartPage

import React from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Stack, IconButton} from '@mui/material';
import ProjectDialog from './muiDialog';
import styled from '@mui/system/styled';
import data from '../editPopup/data';

export default function SelectProjectsNew({projects, changeState} : any) {

    const [formOpen, setFormOpen] = React.useState(false);
    const [projectData, setProjectData] = React.useState(data.tree[0]);
    const [project, setProject] = React.useState(projects[0]);
    const handleCloseForm = () => {
          setFormOpen(false);
      }
      const handleOpenForm = () => {
          setFormOpen(true);
      }
      const changeProps = (value : any) => {
        // console.log(value)
        setProjectData(value)
        // setProject(value)
        changeState(value)
        handleCloseForm()
      }
  return (

    <Box sx={{ flexGrow: 0 }}>
        <div><Button variant="text" onClick={handleOpenForm}  > Открыть проект</Button></div>
        <div><Button variant="text"  > Настроить проекты</Button></div>
        {/* <ProjectDialog formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/> */}
        <ProjectDialog projects={projects} formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>
    </Box>
  );
}
