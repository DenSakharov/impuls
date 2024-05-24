
import React from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Stack, IconButton} from '@mui/material';
import ProjectDialog from './muiDialog';
import styled from '@mui/system/styled';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

const ImpulseButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 12,
  padding: '6px 0px',
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


export default function SelectProjects({projects, changeState} : any) {

    const [formOpen, setFormOpen] = React.useState(false);
    const [project, setProject] = React.useState(projects[0]);
    const handleCloseForm = () => {
          setFormOpen(false);
      }
      const handleOpenForm = () => {
          setFormOpen(true);
      }
      const changeProps = (value : any) => {
        setProject(value)
        changeState(value)
        handleCloseForm()
      }
  return (

    <Box sx={{ flexGrow: 0, backgroundColor: '#147298'}}>
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 300}}>

            <Stack spacing={1} direction="row">
              <IconButton size="small" onClick={handleOpenForm}>     <PublishedWithChangesOutlinedIcon fontSize="small"/></IconButton>
              <ImpulseButton variant="text" onClick={handleOpenForm} sx={{maxHeight: 30,color: 'white'}} > {project.name} </ImpulseButton>
            </Stack>
            </Container>
            <ProjectDialog projects={projects} formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>
    </Box>
  );
}
