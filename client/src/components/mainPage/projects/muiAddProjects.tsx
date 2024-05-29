// Кожевников СЮ страница компонентов для создания проекта на StartPage

import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Stack, IconButton} from '@mui/material';
import AddProjectsModal from './createProjects';
import MuiAllProjectsModal from './muiAllProjects';

export default function SelectProjects({changeState} : any) {
  const [showModalCreate, setShowModalCreate] = useState(false); 
  const [showModalList, setShowModalList] = useState(false);
  
  // Create Projects
  const handleCloseModalCreate = () => {
      setShowModalCreate(false);      
  };
  
  // List Projects
  const handleCloseModaList = () => {        
      setShowModalList(false);
  };

  return (

    <Box sx={{ flexGrow: 0}}>
        <div><Button variant="text" onClick={() => setShowModalCreate(true)}> Создать проект </Button></div>
        {/* <div><Button variant="text" onClick={() => setShowModalEdit(true)}> Изменить проект </Button></div> */}        
        <div><Button variant="text" onClick={() => setShowModalList(true)} > Все проекты</Button></div>

        {showModalCreate && <AddProjectsModal onClose={handleCloseModalCreate} />}
        {/* {showModalList && <MuiAllProjectsModal onClose={handleCloseModalList} />} */}
        {/* {showModalEdit && <EditProjectsModal open={showModalEdit} projectsItem={currentProjectsUpdate} onClose={handleCloseModalEdit} />} */}

    </Box>
  );
}
