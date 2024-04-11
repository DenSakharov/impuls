import React, { Profiler } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Container, Divider, Menu, MenuItem } from '@mui/material';
import ProjectDialog from './muiDialog';
import data from '../editPopup/data';

export default function MainFormBar({changeState} : any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [formOpen, setFormOpen] = React.useState(false);
    const [projectData, setProjectData] = React.useState(data.tree[0]);
    const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleCloseForm = () => {
          setFormOpen(false);
      }
    
      const handleOpenForm = () => {
          setFormOpen(true);
      }

      const changeProps = (value : any) => {
        setProjectData(value)
        changeState(value)
        handleCloseForm()
      }
  return (
    <Box sx={{ flexGrow: 0, backgroundColor: '#157298'}}>
      <AppBar position="static" sx={{backgroundColor: '#147298'}}>
        <Toolbar sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '10px'}}>
            <Box
                component="img"
                sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 150, md: 50 },
                maxWidth: { xs: 150, md: 50 },
                marginRight: '10px',
                }}
                alt="impuls"
                src="./img/logo.png"
            />
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 300}}>
                <Typography variant="h5" component="div" > IMS IMPULS </Typography>
                <Button variant="text" onClick={handleOpenForm} sx={{maxHeight: 30,color: 'white'}} > {projectData.name} </Button>
            </Container>
            <Container sx={{display:'flex', alignItems: 'stretch', justifyContent: 'flex-end'}}>
                <ButtonGroup >
                    <Button variant='text' size='large' sx={{color: 'white'}}> Home </Button>
                    <Button variant='text' size='large' sx={{color: 'white'}}> Меню 1 </Button>
                    <Button variant='text' size='large' sx={{color: 'white'}}  onMouseOver={handleHover}> Меню 2 </Button>
                        <Menu 
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                                <MenuItem onClick={handleClose}>Сделать действие 1 </MenuItem>
                                <MenuItem onClick={handleClose}>Сделать действие 2</MenuItem>
                                <MenuItem onClick={handleClose}>Сделать действие 3</MenuItem>   
                        </Menu>
                    <Button variant='text' size='large'sx={{color: 'white'}}> Меню 3 </Button>
                    <Button variant='text' size='large'sx={{color: 'white'}}> Меню 4 </Button>
                    <Divider color ='white' orientation="vertical" flexItem />
                    <Button variant='text' size='large'sx={{color: 'white'}}>Профиль</Button>
                    <Button variant='text' size='large'sx={{color: 'white'}}>Выйти </Button>

                </ButtonGroup>

            </Container>
        </Toolbar>
      </AppBar>
      <ProjectDialog formOpen={formOpen} handleCloseForm={handleCloseForm} changeProps={changeProps}/>
    </Box>




  );
}