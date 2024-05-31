// Кожевников СЮ страница компонентов для создания проекта на StartPage

import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Stack, IconButton} from '@mui/material';
import AddProjectsModal from './createProjects';
import MuiAllProjectsModal from './muiAllProjects';

export type SelectProjectsProps = {
  reload: () => void
}
export default function SelectProjects({reload} : SelectProjectsProps) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalList, setShowModalList] = useState(false);

  // Create Projects
  const handleCloseModalCreate = () => {
      setShowModalCreate(false);
      reload();
  };
  
  // List Projects
  const handleCloseModaList = () => {        
      setShowModalList(false);
      reload();
  };

  return (
    <Box sx={{ flexGrow: 0}}>
        <div><Button variant="text" onClick={() => setShowModalCreate(true)}> Создать проект </Button></div>
          {showModalCreate && <AddProjectsModal onClose={handleCloseModalCreate} />}
        <div><Button variant="text" onClick={() => setShowModalList(true)} > Все проекты</Button></div>
          {showModalList &&<MuiAllProjectsModal onClose={handleCloseModaList} />}
    </Box>
  );
}
