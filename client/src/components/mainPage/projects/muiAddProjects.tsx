// Кожевников СЮ страница компонентов для создания проекта на StartPage

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Stack, IconButton} from '@mui/material';
import AddProjectsModal from './createProjects';
import data from '../../editPopup/data';

export default function SelectProjects({changeState} : any) {
    const [showModalCreate, setShowModalCreate] = useState(false);

    const handleCloseModalCreate = () => {
      setShowModalCreate(false);
      // fetchProjectsData();
  };

  return (

    <Box sx={{ flexGrow: 0}}>
        <div><Button variant="text" onClick={() => setShowModalCreate(true)}> Создать проект </Button></div>
        <div><Button variant="text"  > Все проекты</Button></div>
        {showModalCreate && <AddProjectsModal onClose={handleCloseModalCreate} />}

    </Box>
  );
}
