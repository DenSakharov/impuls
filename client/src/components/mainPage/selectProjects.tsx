// Кожевников СЮ выбор проекта из дерева

import React from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Stack, IconButton} from '@mui/material';
import ProjectDialog from './muiDialog';
import data from '../editPopup/data';
import styled from '@mui/system/styled';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

const ImpulseButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  height: 40,
  padding: 0,
  margin: 0,
  border: '1.5px solid',
  lineHeight: 1.5,
  backgroundColor: '#147298',
  borderColor: '#0070AC',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#147298',
    borderColor: '#0489D1',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#075985',
    borderColor: '#FCFCFC',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.1rem rgba(7,89,163,.5)',
  },
});


export default function SelectProjects({changeState} : any) {

    const [formOpen, setFormOpen] = React.useState(false);
    const [projectData, setProjectData] = React.useState(data.tree[0]);
    const handleCloseForm = () => {
          setFormOpen(false);
      }
      const handleOpenForm = () => {
          setFormOpen(true);
      }
      const changeProps = (value : any) => {
        // console.log(value)
        setProjectData(value)
        changeState(value)
        handleCloseForm()
      }

  return (

    <Box sx={{ flexGrow: 0, backgroundColor: '#147298', margin  : '0px'}}>
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 40, justifyContent:'center'}}>
              <Stack spacing={1} direction="row">
                <ImpulseButton variant="text" onClick={handleOpenForm} sx={{maxHeight: 30,color: 'white'}} > {projectData.name} </ImpulseButton>
              </Stack>
            </Container>

         {/* Диалог выбора проекта     */}
        <ProjectDialog formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>
    </Box>
  );
}
